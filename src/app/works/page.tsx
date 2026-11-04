"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { works, type WorkItem } from "@/lib/data";
import { CATEGORY_LABEL } from "@/lib/work-meta";
import { SectionHeading } from "@/components/SectionHeading";
import { WorkGrid } from "@/components/WorkCard";

const orderedWorks = [...works].reverse();

const filters: WorkItem["tag"][] = ["ALL", "GAME", "WEB", "PRODUCT", "OTHER"];

export default function WorksPage() {
  const [tag, setTag] = useState<WorkItem["tag"]>("ALL");

  const filtered = useMemo(() => {
    if (tag === "ALL") return orderedWorks;
    return orderedWorks.filter((w) => w.tag === tag);
  }, [tag]);

  return (
    <div className="space-y-8 pb-24 pt-10">
      <SectionHeading as="h1">WORKS</SectionHeading>

      <div role="group" aria-label="種類で絞り込む" className="flex flex-wrap gap-2">
        {filters.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tag === t}
            onClick={() => setTag(t)}
            className={cn(
              "h-8 border px-3 font-hud text-xs tracking-[0.08em] transition-colors",
              tag === t
                ? "border-accent bg-accent text-on-accent"
                : "border-line text-ink-2 hover:border-accent hover:text-accent"
            )}
          >
            {CATEGORY_LABEL[t]}
          </button>
        ))}
      </div>

      <WorkGrid works={filtered} />
    </div>
  );
}
