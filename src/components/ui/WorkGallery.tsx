"use client";

import Image from "next/image";
import { Lightbox, useLightbox } from "@/components/Lightbox";

type GalleryItem = { src: string; alt: string };

export function WorkGallery({ items }: { items: GalleryItem[] }) {
  const lb = useLightbox(items.length);

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((g, idx) => (
          <button
            key={`${g.src}-${idx}`}
            type="button"
            aria-label={`${g.alt}を拡大表示`}
            onClick={() => lb.open(idx)}
            className="group frame-hover relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-sm bg-subtle"
          >
            <Image
              src={g.src}
              alt={g.alt}
              fill
              className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
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
