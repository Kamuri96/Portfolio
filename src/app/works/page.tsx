"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
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

      <div className="flex justify-center gap-8 border-b border-black/[0.05] pb-4 mb-12">
        {filters.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={cn(
              "text-[10px] tracking-[0.2em] transition-all duration-300 relative py-2",
              tag === t
                ? "text-blue-600 font-bold"
                : "text-black/40 hover:text-black"
            )}
          >
            {t}
            {tag === t && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 animate-in fade-in zoom-in duration-300" />
            )}
          </button>
        ))}
      </div>
      <div className="mx-auto max-w-[900px]">
        {/* key={tag} を残すことで、フィルター切り替え時も「バーっと」再描画されます */}
        <ThumbGrid
          key={tag}
          items={filtered}
          hrefPrefix="/works"
          type="works"
        />
      </div>
    </div>
  );
}
