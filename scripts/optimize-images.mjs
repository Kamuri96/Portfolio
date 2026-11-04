// 元画像から、配信用の WebP を public/img に生成する。
// 静的書き出しでは Next.js の画像最適化が使えないため、ビルド前（prebuild / predev）に実行する。
//
// - assets/img/foo/bar.png        → public/img/foo/bar.webp（サイト共通の画像。コードから "/img/foo/bar.webp" で参照）
// - content/works/<slug>/bar.png  → public/img/works/<slug>/bar.webp（作品の画像。src/lib/content.ts が参照を組み立てる）
// - content/illustrations/bar.png → public/img/illustrations/bar.webp（拡大表示用・長辺 2400px）
//                                   public/img/illustrations/thumb/bar.webp（一覧用・長辺 800px）
// - OGP 用に public/img/og/foo/bar.jpg も生成する（WebP 非対応の SNS があるため。src/lib/site.ts の ogImage）
// - 元画像より新しい出力があれば変換をスキップする
// - 最後に src/ 内の "/img/..." 参照がすべて存在するか確認し、なければ失敗する

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// 元画像の置き場所と、public/img 内の出力先・長辺の上限（thumb があれば一覧用の小さい画像も作る）
const ROOTS = [
  { src: "assets/img", out: "", max: 1600 },
  { src: "content/works", out: "works", max: 1600 },
  { src: "content/illustrations", out: "illustrations", max: 2400, thumb: { out: "illustrations/thumb", max: 800 } },
];
const OUT_DIR = "public/img";
const OG_DIR = path.join(OUT_DIR, "og");
const OG_MAX_SIZE = 1200;
const QUALITY = 80;
const SOURCE_EXT = /\.(png|jpe?g|gif|webp)$/i;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const p = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(p) : [p];
  });
}

const outPath = (dir, { root, file }, ext, sub = root.out) =>
  path.join(dir, sub, path.relative(root.src, file)).replace(SOURCE_EXT, ext);

const isFresh = (out, src) =>
  fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs;

const sources = ROOTS.flatMap((root) =>
  walk(root.src)
    .filter((f) => SOURCE_EXT.test(f))
    .map((file) => ({ root, file }))
);
const expected = new Set();
let converted = 0;

for (const src of sources) {
  const webp = outPath(OUT_DIR, src, ".webp");
  const og = outPath(OG_DIR, src, ".jpg");
  if (expected.has(webp)) {
    console.error(`[images] 出力先が重複しています（拡張子違いの同名ファイルなど）: ${webp}`);
    process.exit(1);
  }
  expected.add(webp);
  expected.add(og);
  const thumb = src.root.thumb && outPath(OUT_DIR, src, ".webp", src.root.thumb.out);
  if (thumb) expected.add(thumb);
  if (isFresh(webp, src.file) && isFresh(og, src.file) && (!thumb || isFresh(thumb, src.file))) continue;

  fs.mkdirSync(path.dirname(webp), { recursive: true });
  fs.mkdirSync(path.dirname(og), { recursive: true });
  const resize = (size) => ({ width: size, height: size, fit: "inside", withoutEnlargement: true });
  await sharp(src.file, { animated: true }).resize(resize(src.root.max)).webp({ quality: QUALITY }).toFile(webp);
  if (thumb) {
    fs.mkdirSync(path.dirname(thumb), { recursive: true });
    await sharp(src.file, { animated: true }).resize(resize(src.root.thumb.max)).webp({ quality: QUALITY }).toFile(thumb);
  }
  await sharp(src.file).resize(resize(OG_MAX_SIZE)).flatten({ background: "#ffffff" }).jpeg({ quality: QUALITY }).toFile(og);
  converted++;
}

// 元画像が消えた出力を削除する
let removed = 0;
for (const out of walk(OUT_DIR)) {
  if (!expected.has(out)) {
    fs.rmSync(out);
    removed++;
  }
}

console.log(
  `[images] ${sources.length} 件（変換 ${converted} / スキップ ${sources.length - converted} / 削除 ${removed}）`
);

// macOS は大文字・小文字を区別しないため、ローカルでは通っても Linux（Cloudflare のビルド）で
// 画像が見つからないことがある。Git に記録された名前とディスク上の名前が一致するか確認する
try {
  const dirs = ROOTS.map((r) => r.src);
  const tracked = execFileSync("git", ["ls-files", "-z", ...dirs], { encoding: "utf8" })
    .split("\0")
    .filter(Boolean);
  const onDisk = new Set(dirs.flatMap(walk).map((f) => f.split(path.sep).join("/")));
  const mismatched = tracked.filter((f) => !onDisk.has(f));
  if (mismatched.length > 0) {
    console.error("[images] Git に記録された名前とディスク上の名前が一致しません（大文字・小文字の違いなど）:");
    for (const f of mismatched) console.error(`  ${f}`);
    console.error("  git mv で Git 側の名前をディスクに合わせてください（大文字・小文字だけの変更は一度別名を経由する）");
    process.exit(1);
  }
} catch (e) {
  if (e.status === undefined) {
    // git が使えない環境ではこの確認をスキップする
  } else {
    throw e;
  }
}

// src 内に直接書かれた画像参照が実在するか確認する（大文字・小文字も区別する）
// 作品の画像（content/works の index.md 内の参照）は src/lib/content.ts が読み込み時に確認する
const generated = new Set(
  [...expected].map((f) => "/" + path.relative("public", f).split(path.sep).join("/"))
);
const missing = [];
for (const file of walk("src").filter((f) => /\.(tsx?|mdx?)$/.test(f))) {
  const text = fs.readFileSync(file, "utf8");
  // 拡張子付きのパスだけを対象にする（"/img/og/" のような接頭辞の文字列は除外）
  for (const [, ref] of text.matchAll(/["'`](\/img\/[^"'`]+\.\w+)["'`]/g)) {
    // テンプレート文字列で組み立てるパス（${...} を含むもの）は読み込み側で確認するので除外
    if (!ref.includes("${") && !generated.has(ref)) missing.push(`${file}: ${ref}`);
  }
}
if (missing.length > 0) {
  console.error("[images] 存在しない画像を参照しています（assets/img に元画像があり、拡張子が .webp か確認してください）:");
  for (const m of missing) console.error(`  ${m}`);
  process.exit(1);
}
