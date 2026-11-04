"use client";

import { useEffect, useState } from "react";
import { formatDate, type ArticleItem } from "@/lib/articles";

type Props = {
  /** ビルド時に取得した記事。API が使えないときはこれを表示し続ける */
  initialArticles: ArticleItem[];
  limit?: number;
};

export function ArticleList({ initialArticles, limit }: Props) {
  const [articles, setArticles] = useState(initialArticles);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/articles", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { articles?: ArticleItem[] } | null) => {
        if (Array.isArray(data?.articles)) setArticles(data.articles);
      })
      .catch(() => {
        // 取得失敗・タイムアウト時はビルド時のデータのまま
      });
    return () => controller.abort();
  }, []);

  const items = limit ? articles.slice(0, limit) : articles;

  if (items.length === 0) {
    return <p className="py-10 text-center text-ink-3">記事が見つかりませんでした。</p>;
  }

  return (
    <ul>
      {items.map((a) => (
        <li key={a.id} className="border-b border-line">
          <a
            href={a.id}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-1 py-4 sm:grid-cols-[7.5rem_4.5rem_1fr]"
          >
            <time dateTime={a.publishedAt} className="font-hud text-sm tabular-nums text-ink-3">
              {formatDate(a.publishedAt)}
            </time>
            <span className="hidden font-hud text-xs leading-6 text-accent sm:block">
              {a.platformName.toUpperCase()}
            </span>
            <span className="text-[15px] text-ink group-hover:text-accent">{a.title}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
