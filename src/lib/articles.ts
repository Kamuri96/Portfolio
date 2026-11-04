// 記事フィードの取得・パース処理。
// Next.js のビルド時（Node）と Cloudflare Worker（/api/articles）の両方から使うため、
// Node 専用 API に依存せず fetch と文字列処理だけで実装している。

export type ArticleItem = {
  id: string;
  title: string;
  image: string;
  /** ISO 8601 */
  publishedAt: string;
  platformName: string;
};

export type Feed = {
  platform: string;
  url: string;
  icon: string;
};

export const FEEDS: Feed[] = [
  {
    platform: "Qiita",
    url: "https://qiita.com/Kamuri96/feed",
    icon: "https://cdn.qiita.com/assets/favicons/public/production-c620d3e403342b1022967ba5e3db1aaa.ico",
  },
  {
    platform: "Zenn",
    url: "https://zenn.dev/kamuri96/feed",
    icon: "https://zenn.dev/images/logo-transparent.png",
  },
  {
    platform: "note",
    url: "https://note.com/kamuri_96/rss",
    icon: "https://assets.st-note.com/poc-image/manual/note-common-images/production/svg/production.ico",
  },
];

const FETCH_TIMEOUT_MS = 5000;

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
};

function decodeXml(text: string): string {
  const cdata = text.match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/);
  if (cdata) return cdata[1].trim();
  return text
    .replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (m, code: string) => {
      if (code[0] === "#") {
        const n =
          code[1] === "x" || code[1] === "X"
            ? parseInt(code.slice(2), 16)
            : parseInt(code.slice(1), 10);
        return Number.isNaN(n) ? m : String.fromCodePoint(n);
      }
      return ENTITIES[code.toLowerCase()] ?? m;
    })
    .trim();
}

function tagText(block: string, tag: string): string | undefined {
  // 自己終了タグ（<link ... />）にはマッチさせない
  const m = block.match(
    new RegExp(`<${tag}(?:\\s[^>]*)?(?<!/)>([\\s\\S]*?)</${tag}>`)
  );
  return m ? decodeXml(m[1]) : undefined;
}

function entryLink(block: string): string | undefined {
  // RSS 2.0: <link>URL</link> / Atom: <link rel="alternate" href="URL"/>
  const text = tagText(block, "link");
  if (text) return text;
  const links = block.match(/<link\b[^>]*>/g) ?? [];
  const alternate =
    links.find((l) => /rel="alternate"/.test(l)) ??
    links.find((l) => !/rel=/.test(l));
  const href = alternate?.match(/href="([^"]+)"/)?.[1];
  return href ? decodeXml(href) : undefined;
}

/** RSS 2.0 と Atom の両方に対応した最小限のパーサ */
export function parseFeed(xml: string, feed: Feed): ArticleItem[] {
  const blocks = xml.match(/<(item|entry)\b[\s\S]*?<\/\1>/g) ?? [];
  return blocks.flatMap((block) => {
    const link = entryLink(block);
    const title = tagText(block, "title");
    const date =
      tagText(block, "pubDate") ??
      tagText(block, "published") ??
      tagText(block, "updated");
    const time = date ? new Date(date).getTime() : NaN;
    if (!link || !title || Number.isNaN(time)) return [];
    return [
      {
        id: link,
        title,
        image: feed.icon,
        publishedAt: new Date(time).toISOString(),
        platformName: feed.platform,
      },
    ];
  });
}

export async function fetchFeed(feed: Feed): Promise<ArticleItem[]> {
  const res = await fetch(feed.url, {
    headers: { "User-Agent": "portfolio-article-fetcher" },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`${feed.platform}: HTTP ${res.status}`);
  return parseFeed(await res.text(), feed);
}

export function sortByDate(articles: ArticleItem[]): ArticleItem[] {
  return [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/** ビルド時用。失敗したフィードは除外して返す */
export async function getArticles(): Promise<ArticleItem[]> {
  // Next.js はこの fetch を .next/cache/fetch-cache に長期キャッシュするため、
  // package.json の prebuild でビルド前に削除している（no-store は静的書き出しと両立しない）
  const results = await Promise.allSettled(FEEDS.map((feed) => fetchFeed(feed)));
  return sortByDate(
    results.flatMap((res, i) => {
      if (res.status === "fulfilled") return res.value;
      console.warn(`[articles] ${FEEDS[i].platform} の取得に失敗`, res.reason);
      return [];
    })
  );
}

export function formatDate(iso: string): string {
  // ビルド環境・Worker・ブラウザのタイムゾーン差を避けるため JST 固定で表示
  return new Date(iso)
    .toLocaleDateString("ja-JP", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, ".");
}
