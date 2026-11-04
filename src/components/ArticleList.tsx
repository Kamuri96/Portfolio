"use client";

import { useEffect, useState } from "react";
import type { ArticleItem } from "@/lib/articles";
import { ThumbGrid } from "@/components/ui/work-grid";

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
    return (
      <p className="text-center text-ink-3 py-10">
        記事が見つかりませんでした。
      </p>
    );
  }

  return <ThumbGrid items={items} hrefPrefix="/articles" type="articles" />;
}
