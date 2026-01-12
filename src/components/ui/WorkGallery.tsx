"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryItem = { src: string; alt?: string };

export function WorkGallery({ items }: { items: GalleryItem[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedImage = selectedIndex !== null ? items[selectedIndex] : null;
  const showPrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedIndex((current) => {
        if (current === null) return null;
        return current === 0 ? items.length - 1 : current - 1;
      });
    },
    [items.length]
  );

  const showNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedIndex((current) => {
        if (current === null) return null;
        return current === items.length - 1 ? 0 : current + 1;
      });
    },
    [items.length]
  );

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, showNext, showPrev]);

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((g, idx) => (
          <button
            key={`${g.src}-${idx}`}
            onClick={() => setSelectedIndex(idx)}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-blue-50/30 border border-blue-100/20 shadow-sm transition-all duration-500 hover:shadow-md cursor-zoom-in"
          >
            <Image
              src={g.src}
              alt={g.alt ?? `Gallery image ${idx + 1}`}
              fill
              className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-blue-500/0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:bg-blue-500/5 group-hover:opacity-100">
              <div className="bg-white/80 p-2 rounded-full shadow-lg transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                <ZoomIn className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-50 hover:bg-white/10 rounded-full"
            onClick={() => setSelectedIndex(null)}
          >
            <X className="h-8 w-8" />
          </button>

          {items.length > 1 && (
            <>
              <button
                onClick={showPrev}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors z-50 hover:bg-white/10 rounded-full"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" />
              </button>
              <button
                onClick={showNext}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors z-50 hover:bg-white/10 rounded-full"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8 sm:h-10 sm:w-10" />
              </button>
            </>
          )}

          <div
            className="relative w-full h-full max-w-[90vw] max-h-[85vh] flex flex-col items-center justify-center gap-4 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex-1">
              <Image
                key={selectedImage.src}
                src={selectedImage.src}
                alt={selectedImage.alt ?? "Detail"}
                fill
                className="object-contain animate-in zoom-in-95 duration-300"
                sizes="95vw"
                priority
              />
            </div>
            {selectedImage.alt && (
              <p
                key={`cap-${selectedImage.src}`}
                className="text-white/80 text-sm tracking-widest font-medium animate-in slide-in-from-bottom-2 duration-500 text-center px-4"
              >
                {selectedImage.alt}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
