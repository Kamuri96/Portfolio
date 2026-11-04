// assets/img の元画像から、配信用の WebP を public/img に生成する。
// 静的書き出しでは Next.js の画像最適化が使えないため、ビルド前（prebuild / predev）に実行する。
//
// - assets/img/foo/bar.png → public/img/foo/bar.webp（コードからは "/img/foo/bar.webp" で参照）
// - OGP 用に public/img/og/foo/bar.jpg も生成する（WebP 非対応の SNS があるため。src/lib/site.ts の ogImage）
// - 元画像より新しい出力があれば変換をスキップする
// - 最後に src/ 内の "/img/..." 参照がすべて存在するか確認し、なければ失敗する

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = "assets/img";
const OUT_DIR = "public/img";
const OG_DIR = path.join(OUT_DIR, "og");
const MAX_SIZE = 1600;
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

const outPath = (dir, src, ext) =>
  path.join(dir, path.relative(SRC_DIR, src)).replace(SOURCE_EXT, ext);

const isFresh = (out, src) =>
  fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs;

const sources = walk(SRC_DIR).filter((f) => SOURCE_EXT.test(f));
const expected = new Set();
let converted = 0;

for (const src of sources) {
  const webp = outPath(OUT_DIR, src, ".webp");
  const og = outPath(OG_DIR, src, ".jpg");
  if (expected.has(webp)) {
    console.error(`[images] 出力先が重複しています（拡張子違いの同名ファイル）: ${webp}`);
    process.exit(1);
  }
  expected.add(webp);
  expected.add(og);
  if (isFresh(webp, src) && isFresh(og, src)) continue;

  fs.mkdirSync(path.dirname(webp), { recursive: true });
  fs.mkdirSync(path.dirname(og), { recursive: true });
  const resize = (size) => ({ width: size, height: size, fit: "inside", withoutEnlargement: true });
  await sharp(src, { animated: true }).resize(resize(MAX_SIZE)).webp({ quality: QUALITY }).toFile(webp);
  await sharp(src).resize(resize(OG_MAX_SIZE)).flatten({ background: "#ffffff" }).jpeg({ quality: QUALITY }).toFile(og);
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
  const tracked = execFileSync("git", ["ls-files", "-z", SRC_DIR], { encoding: "utf8" })
    .split("\0")
    .filter(Boolean);
  const onDisk = new Set(walk(SRC_DIR).map((f) => f.split(path.sep).join("/")));
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

// src 内の画像参照が実在するか確認する（大文字・小文字も区別する）
const generated = new Set(
  [...expected].map((f) => "/" + path.relative("public", f).split(path.sep).join("/"))
);
const missing = [];
for (const file of walk("src").filter((f) => /\.(tsx?|mdx?)$/.test(f))) {
  const text = fs.readFileSync(file, "utf8");
  // 拡張子付きのパスだけを対象にする（"/img/og/" のような接頭辞の文字列は除外）
  for (const [, ref] of text.matchAll(/["'`](\/img\/[^"'`]+\.\w+)["'`]/g)) {
    if (!generated.has(ref)) missing.push(`${file}: ${ref}`);
  }
}
if (missing.length > 0) {
  console.error("[images] 存在しない画像を参照しています（assets/img に元画像があり、拡張子が .webp か確認してください）:");
  for (const m of missing) console.error(`  ${m}`);
  process.exit(1);
}
