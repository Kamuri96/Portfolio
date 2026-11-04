// Cloudflare Worker エントリ。
// 静的アセット（out/）に一致しないリクエストだけがここに届く。
// /api/articles で記事一覧を返し、それ以外はアセット側（404 など）に委ねる。

import {
  FEEDS,
  fetchFeed,
  sortByDate,
  type ArticleItem,
} from "../src/lib/articles";

type Env = {
  ASSETS: { fetch(request: Request): Promise<Response> };
};

type Ctx = { waitUntil(promise: Promise<unknown>): void };

/**
 * この時間内はフィードを再取得しない。
 * キャッシュは isolate ごとなので、isolate が入れ替わると期限前でも取り直す（実際の間隔はこれ以下になる）
 */
const FRESH_MS = 24 * 60 * 60 * 1000;
/** ブラウザ側のキャッシュ時間（秒） */
const BROWSER_MAX_AGE = 300;

// workers.dev では Cache API が機能しないため、isolate のメモリに保持する。
// isolate が破棄されたら次のリクエストで取り直すだけなので、永続化はしない。
const feedCache = new Map<string, ArticleItem[]>();
let fetchedAt = 0;
let inflight: Promise<void> | null = null;

async function refresh(): Promise<void> {
  const results = await Promise.allSettled(FEEDS.map(fetchFeed));
  results.forEach((res, i) => {
    const { platform } = FEEDS[i];
    if (res.status === "fulfilled") {
      feedCache.set(platform, res.value);
    } else {
      // 失敗したフィードは前回取得分を使い続ける
      console.warn(`[articles] ${platform} の取得に失敗`, String(res.reason));
    }
  });
  if (results.some((r) => r.status === "fulfilled")) fetchedAt = Date.now();
}

function refreshOnce(): Promise<void> {
  inflight ??= refresh().finally(() => {
    inflight = null;
  });
  return inflight;
}

async function handleArticles(ctx: Ctx): Promise<Response> {
  if (fetchedAt === 0) {
    await refreshOnce();
  } else if (Date.now() - fetchedAt > FRESH_MS) {
    // 古いデータを即返し、裏で更新する
    ctx.waitUntil(refreshOnce());
  }

  if (fetchedAt === 0) {
    return Response.json(
      { error: "記事フィードを取得できませんでした" },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  return Response.json(
    {
      articles: sortByDate([...feedCache.values()].flat()),
      fetchedAt: new Date(fetchedAt).toISOString(),
    },
    { headers: { "Cache-Control": `public, max-age=${BROWSER_MAX_AGE}` } }
  );
}

const worker = {
  async fetch(request: Request, env: Env, ctx: Ctx): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/articles") {
      if (request.method !== "GET" && request.method !== "HEAD") {
        return new Response(null, { status: 405, headers: { Allow: "GET" } });
      }
      return handleArticles(ctx);
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;
