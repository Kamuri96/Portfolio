"use client";

import Image from "next/image";
import { Lightbox, useLightbox } from "@/components/Lightbox";

type GalleryItem = { src: string; alt: string; width: number; height: number };

export function WorkGallery({ items }: { items: GalleryItem[] }) {
  const lb = useLightbox(items.length);

  return (
    <section className="space-y-6">
      {/* 縦横比のまま 2 段に並べる（切り抜かない） */}
      <div className="columns-1 gap-4 sm:columns-2">
        {items.map((g, idx) => (
          <button
            key={`${g.src}-${idx}`}
            type="button"
            aria-label={`${g.alt}を拡大表示`}
            onClick={() => lb.open(idx)}
            className="mb-4 block w-full cursor-zoom-in break-inside-avoid transition-opacity hover:opacity-85"
          >
            <Image
              src={g.src}
              alt={g.alt}
              width={g.width}
              height={g.height}
              className="block h-auto w-full rounded-sm"
              sizes="(max-width: 640px) 100vw, 320px"
            />
          </button>
        ))}
      </div>

      <Lightbox
        items={items.map((g) => ({ src: g.src, alt: g.alt, label: "GALLERY" }))}
        index={lb.index}
        onClose={lb.close}
        onPrev={lb.prev}
        onNext={lb.next}
      />
    </section>
  );
}
