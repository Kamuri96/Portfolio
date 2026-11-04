import { profile } from "@/lib/data";

export const SITE_URL = "https://portfolio.nyan-nyaka.workers.dev";

export const SITE_NAME = profile.handle;

export const SITE_DESCRIPTION = `${profile.handle}（${profile.name}）のポートフォリオ。ゲーム、イラスト、デバイス、ワークショップなどの制作物と記事をまとめています。`;

export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;

/** ページ側で openGraph を指定すると親の値が丸ごと置き換わるため、共通部分をここに置く */
export const BASE_OPEN_GRAPH = {
  siteName: SITE_NAME,
  locale: "ja_JP",
  type: "website",
} as const;

/** 配信用画像（/img/foo.webp）に対応する OGP 用 JPEG のパス。scripts/optimize-images.mjs が生成する */
export function ogImage(src: string): string {
  return src.replace(/^\/img\//, "/img/og/").replace(/\.webp$/, ".jpg");
}

/** 改行を含むタイトル（作品名など）を 1 行にする */
export function toPlainText(text: string): string {
  return text.replace(/\s*\n\s*/g, " ").trim();
}
