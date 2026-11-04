// content/ のファイル（作品の index.md・profile.yaml）を読み込む。ビルド時にだけ動く（fs を使う）
//
// 書き間違いはここで検出し、どのファイルのどの項目かを示してビルドを止める
import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { z } from "zod";
import { CATEGORIES, type Category } from "@/lib/work-meta";

const CONTENT_DIR = path.join(process.cwd(), "content");
const WORKS_DIR = path.join(CONTENT_DIR, "works");

// ---------- スキーマ ----------

// YAML では 2025 が数値、2025-04 が文字列になるため、どちらも文字列として受け取る
const yearMonth = z
  .union([z.string(), z.number()])
  .transform(String)
  .pipe(z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, "「2025」か「2025-04」の形で書いてください"));

const WorkFrontmatter = z
  .object({
    title: z.string().min(1),
    category: z.enum(CATEGORIES),
    /** 並び順に使う開始年月 */
    date: yearMonth,
    /** 表示用の期間（例：2025.4 ~ 5） */
    period: z.string().min(1),
    /** 制作の種類 */
    type: z.enum(["自主制作", "授業", "ハッカソン", "インターン"]),
    /** チームの人数（1 なら個人）。分からなければ省略 */
    team: z.number().int().min(1).optional(),
    role: z.array(z.string().min(1)).min(1),
    tech: z.array(z.string().min(1)).default([]),
    /** 一覧やヒーローに使う画像（同じフォルダ内のファイル名） */
    cover: z.string().min(1),
    gallery: z.array(z.object({ src: z.string().min(1), alt: z.string().min(1) }).strict()).default([]),
    links: z.array(z.object({ label: z.string().min(1), href: z.url() }).strict()).default([]),
  })
  .strict();

const ProfileSchema = z
  .object({
    handle: z.string().min(1),
    name: z.string().min(1),
    title: z.string().min(1),
    about: z.array(z.string().min(1)).min(1),
    experiences: z
      .array(
        z
          .object({
            period: z.union([z.string(), z.number()]).transform(String),
            headline: z.string().min(1),
            detail: z.string().optional(),
          })
          .strict()
      )
      .default([]),
    skills: z
      .array(
        z
          .object({
            name: z.string().min(1),
            since: z.union([z.string(), z.number()]).transform(String),
            description: z.string().min(1),
          })
          .strict()
      )
      .default([]),
  })
  .strict();

// ---------- 型 ----------

export type Work = {
  slug: string;
  title: string;
  category: Category;
  date: string;
  year: string;
  period: string;
  type: string;
  team?: number;
  role: string[];
  tech: string[];
  links: { label: string; href: string }[];
  /** 配信用の画像 URL（/img/works/<slug>/xxx.webp） */
  cover: string;
  coverSize: ImageSize;
  gallery: ({ src: string; alt: string } & ImageSize)[];
  /** 本文。段落ごとに、行の配列 */
  body: string[][];
};

export type Profile = z.infer<typeof ProfileSchema>;

export type ImageSize = { width: number; height: number };

// ---------- 読み込み ----------

// scripts/optimize-images.mjs が書き出す、配信用画像の大きさ
const SIZES_FILE = path.join(process.cwd(), ".generated/image-sizes.json");
let sizesCache: Record<string, [number, number]> | null = null;

function sizeOf(url: string): ImageSize {
  if (!sizesCache) {
    if (!fs.existsSync(SIZES_FILE)) {
      throw new Error("[content] .generated/image-sizes.json がありません。先に npm run images を実行してください");
    }
    sizesCache = JSON.parse(fs.readFileSync(SIZES_FILE, "utf8"));
  }
  const s = sizesCache![url];
  if (!s) throw new Error(`[content] ${url} の大きさが分かりません。npm run images を実行し直してください`);
  return { width: s[0], height: s[1] };
}

class ContentError extends Error {
  constructor(file: string, message: string) {
    super(`[content] ${path.relative(process.cwd(), file)}\n${message}`);
  }
}

function parseOrThrow<T extends z.ZodType>(schema: T, value: unknown, file: string): z.output<T> {
  const result = schema.safeParse(value);
  if (!result.success) throw new ContentError(file, z.prettifyError(result.error));
  return result.data;
}

function splitFrontmatter(text: string, file: string) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new ContentError(file, "先頭に --- で囲んだ項目（タイトルなど）が必要です");
  return { front: parseYaml(m[1]), body: m[2] };
}

/** 空行で段落を区切り、段落内の改行はそのまま行として扱う */
function parseBody(body: string): string[][] {
  return body
    .trim()
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.split(/\r?\n/).map((l) => l.trim()).filter(Boolean))
    .filter((p) => p.length > 0);
}

/** フォルダ内の画像ファイル名を、配信用の URL に変換する（大文字・小文字も区別して存在を確認） */
function imageUrl(slug: string, file: string, filesInDir: string[], mdFile: string): string {
  if (!filesInDir.includes(file)) {
    throw new ContentError(mdFile, `画像「${file}」が同じフォルダにありません（大文字・小文字も区別します）`);
  }
  return `/img/works/${slug}/${file.replace(/\.(png|jpe?g|gif|webp)$/i, "")}.webp`;
}

function loadWork(slug: string): Work {
  const dir = path.join(WORKS_DIR, slug);
  const file = path.join(dir, "index.md");
  if (!fs.existsSync(file)) throw new ContentError(dir, "index.md がありません");
  const { front, body } = splitFrontmatter(fs.readFileSync(file, "utf8"), file);
  const data = parseOrThrow(WorkFrontmatter, front, file);
  const files = fs.readdirSync(dir);
  const cover = imageUrl(slug, data.cover, files, file);
  return {
    slug,
    title: data.title,
    category: data.category,
    date: data.date,
    year: data.date.slice(0, 4),
    period: data.period,
    type: data.type,
    team: data.team,
    role: data.role,
    tech: data.tech,
    links: data.links,
    cover,
    coverSize: sizeOf(cover),
    gallery: data.gallery.map((g) => {
      const src = imageUrl(slug, g.src, files, file);
      return { src, alt: g.alt, ...sizeOf(src) };
    }),
    body: parseBody(body),
  };
}

let worksCache: Work[] | null = null;

/** すべての作品（新しい順） */
export function getWorks(): Work[] {
  if (worksCache) return worksCache;
  const slugs = fs
    .readdirSync(WORKS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
  for (const slug of slugs) {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
      throw new ContentError(path.join(WORKS_DIR, slug), "フォルダ名は URL になるため、半角英小文字・数字・ハイフンだけにしてください");
    }
  }
  worksCache = slugs
    .map(loadWork)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "ja"));
  return worksCache;
}

export function getWork(slug: string): Work | undefined {
  return getWorks().find((w) => w.slug === slug);
}

// ---------- イラスト ----------

const ILLUST_DIR = path.join(CONTENT_DIR, "illustrations");

const IllustrationSchema = z.array(
  z
    .object({
      file: z.string().min(1),
      title: z.string().min(1),
      year: z
        .union([z.string(), z.number()])
        .transform(String)
        .pipe(z.string().regex(/^\d{4}$/, "「2025」のように 4 桁の年で書いてください")),
      category: z.string().min(1),
      tools: z.array(z.string().min(1)).default([]),
      description: z.string().optional(),
      /** 関連する作品のフォルダ名（content/works/<work>） */
      work: z.string().optional(),
    })
    .strict()
);

export type Illustration = {
  title: string;
  year: string;
  category: string;
  tools: string[];
  description?: string;
  work?: { slug: string; title: string };
  /** 拡大表示用（長辺 2400px まで） */
  src: string;
  /** 一覧用（長辺 800px まで） */
  thumb: string;
} & ImageSize;

let illustCache: Illustration[] | null = null;

/** ギャラリーのイラスト（list.yaml の上から順） */
export async function getIllustrations(): Promise<Illustration[]> {
  if (illustCache) return illustCache;
  const listFile = path.join(ILLUST_DIR, "list.yaml");
  if (!fs.existsSync(listFile)) return (illustCache = []);
  const items = parseOrThrow(IllustrationSchema, parseYaml(fs.readFileSync(listFile, "utf8")) ?? [], listFile);
  const files = fs.readdirSync(ILLUST_DIR);

  illustCache = items.map((item) => {
    if (!files.includes(item.file)) {
      throw new ContentError(listFile, `画像「${item.file}」が content/illustrations にありません（大文字・小文字も区別します）`);
    }
    const work = item.work ? getWork(item.work) : undefined;
    if (item.work && !work) {
      throw new ContentError(listFile, `「${item.title}」の work: ${item.work} に当たる作品がありません（content/works のフォルダ名を書いてください）`);
    }
    const name = item.file.replace(/\.(png|jpe?g|gif|webp)$/i, "");
    const src = `/img/illustrations/${name}.webp`;
    return {
      title: item.title,
      year: item.year,
      category: item.category,
      tools: item.tools,
      description: item.description,
      work: work && { slug: work.slug, title: work.title },
      src,
      thumb: `/img/illustrations/thumb/${name}.webp`,
      ...sizeOf(src),
    };
  });
  return illustCache;
}

let profileCache: Profile | null = null;

export function getProfile(): Profile {
  if (profileCache) return profileCache;
  const file = path.join(CONTENT_DIR, "profile.yaml");
  profileCache = parseOrThrow(ProfileSchema, parseYaml(fs.readFileSync(file, "utf8")), file);
  return profileCache;
}
