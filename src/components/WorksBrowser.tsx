"use client";
// 作品一覧の種類フィルタ。作品データはサーバー側（ページ）で読み込んで渡す
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { Work } from "@/lib/content";
import { CATEGORIES, type Category } from "@/lib/work-meta";
import { WorkGrid } from "@/components/WorkCard";

type Filter = "ALL" | Category;

export function WorksBrowser({ works }: { works: Work[] }) {
  const [filter, setFilter] = useState<Filter>("ALL");

  // 作品がある種類だけをボタンにする
  const filters = useMemo<Filter[]>(
    () => ["ALL", ...CATEGORIES.filter((c) => works.some((w) => w.category === c))],
    [works]
  );
  const filtered = useMemo(
    () => (filter === "ALL" ? works : works.filter((w) => w.category === filter)),
    [works, filter]
  );

  return (
    <>
      <div role="group" aria-label="種類で絞り込む" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "h-8 border px-3 font-hud text-xs tracking-[0.08em] transition-colors",
              filter === f
                ? "border-accent bg-accent text-on-accent"
                : "border-line text-ink-2 hover:border-accent hover:text-accent"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <WorkGrid works={filtered} />
    </>
  );
}
