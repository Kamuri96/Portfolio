"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SectionTitle } from "@/components/ui/section-title";
import { works, type WorkItem } from "@/lib/data";
import { ThumbGrid } from "@/components/ui/work-grid";

const orderedWorks = [...works].reverse();

const filters: WorkItem["tag"][] = ["ALL", "GAME", "WEB", "PRODUCT", "OTHER"];

export default function WorksPage() {
  const [tag, setTag] = useState<WorkItem["tag"]>("ALL");

  const filtered = useMemo(() => {
    if (tag === "ALL") return orderedWorks;
    return orderedWorks.filter((w) => w.tag === tag);
  }, [tag]);

  return (
    <div className="space-y-6">
      <SectionTitle className="mt-8">WORKS</SectionTitle>

      <div className="flex flex-wrap justify-center gap-2">
        {filters.map((t) => {
          const active = t === tag;
          return (
            <button
              key={t}
              onClick={() => setTag(t)}
              type="button"
              aria-pressed={t === tag}
              className="rounded-full focus-visible:outline-none"
            >
              <Badge
                className={[
                  "rounded-full border border-black/15 bg-white px-3 py-1 text-[11px] tracking-[0.18em] text-black/70 shadow-none",
                  active ? "bg-black text-white" : "hover:bg-black/5",
                ].join(" ")}
              >
                {t}
              </Badge>
            </button>
          );
        })}
      </div>

      <div className="mx-auto max-w-[560px]">
        <ThumbGrid items={filtered} hrefPrefix="/works" />
      </div>
    </div>
  );
}
