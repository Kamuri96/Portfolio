"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SectionTitle } from "@/components/ui/section-title";
import { works, type WorkItem } from "@/lib/data";
import { ThumbGrid } from "@/components/ui/work-grid";

const filters: WorkItem["tag"][] = [
  "ALL",
  "GAME",
  "WEB",
  "PRODUCT",
  "ILLUST",
  "OTHER",
];

export default function WorksPage() {
  const [tag, setTag] = useState<WorkItem["tag"]>("ALL");

  const filtered = useMemo(() => {
    if (tag === "ALL") return works;
    return works.filter((w) => w.tag === tag);
  }, [tag]);

  return (
    <div className="space-y-6">
      <SectionTitle className="mt-8">WORKS</SectionTitle>

      <div className="flex flex-wrap justify-center gap-2">
        {filters.map((t) => {
          const active = t === tag;
          return (
            <button key={t} onClick={() => setTag(t)} type="button">
              <Badge
                className={[
                  "rounded-full border border-black/15 bg-white text-[10px] tracking-[0.18em] text-black/70 shadow-none",
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
