"use client";
// イラストの段組み（masonry）と拡大表示。CSS の columns で、縦横比を保ったまま切り抜かずに並べる
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Illustration } from "@/lib/content";
import { Lightbox, useLightbox } from "@/components/Lightbox";

type Props = {
  items: Illustration[];
  /** 種類の絞り込みボタンを出すか（ギャラリーのページだけ） */
  filterable?: boolean;
};

export function IllustGallery({ items, filterable = false }: Props) {
  const categories = useMemo(() => [...new Set(items.map((i) => i.category))], [items]);
  const [filter, setFilter] = useState<string>("ALL");
  const shown = filter === "ALL" ? items : items.filter((i) => i.category === filter);
  const lb = useLightbox(shown.length);

  return (
    <>
      {filterable && categories.length > 1 && (
        <div role="group" aria-label="種類で絞り込む" className="flex flex-wrap gap-2">
          {["ALL", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                "h-8 border px-3 font-hud text-xs tracking-[0.08em] transition-colors",
                filter === c
                  ? "border-accent bg-accent text-on-accent"
                  : "border-line text-ink-2 hover:border-accent hover:text-accent"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="columns-2 gap-2 sm:columns-3 sm:gap-3">
        {shown.map((it, i) => (
          <button
            key={it.src}
            type="button"
            aria-label={`${it.title}を拡大表示`}
            onClick={() => lb.open(i)}
            className="group mb-2 block w-full cursor-zoom-in break-inside-avoid overflow-hidden sm:mb-3"
          >
            <Image
              src={it.thumb}
              alt={it.title}
              width={it.width}
              height={it.height}
              sizes="(max-width: 640px) 50vw, 320px"
              className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      <Lightbox
        items={shown.map((it) => ({
          src: it.src,
          alt: it.title,
          label: it.category,
          caption: (
            <div className="space-y-1">
              <p className="text-base font-bold sm:text-lg">{it.title}</p>
              <p className="font-hud text-xs tracking-[0.08em] text-white/60">
                {[it.year, ...it.tools].join(" / ")}
              </p>
              {it.description && <p className="max-w-[40em] text-sm text-white/80">{it.description}</p>}
              {it.work && (
                <Link href={`/works/${it.work.slug}`} className="inline-block text-sm text-accent underline underline-offset-4">
                  作品ページ：{it.work.title}
                </Link>
              )}
            </div>
          ),
        }))}
        index={lb.index}
        onClose={lb.close}
        onPrev={lb.prev}
        onNext={lb.next}
      />
    </>
  );
}
