"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = selectedIndex !== null;

  // 開いている間は背景のスクロールを止め、閉じたら開く前の要素にフォーカスを戻す
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "Tab") {
        // フォーカスをダイアログ内のボタンに閉じ込める
        const buttons = Array.from(
          dialogRef.current?.querySelectorAll("button") ?? []
        );
        if (buttons.length === 0) return;
        const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
        const next = e.shiftKey
          ? index <= 0 ? buttons.length - 1 : index - 1
          : index === buttons.length - 1 ? 0 : index + 1;
        e.preventDefault();
        buttons[next].focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, showNext, showPrev]);

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((g, idx) => (
          <button
            key={`${g.src}-${idx}`}
            type="button"
            aria-label={`${g.alt ?? `画像${idx + 1}`}を拡大表示`}
            onClick={() => setSelectedIndex(idx)}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-subtle border border-line cursor-zoom-in"
          >
            <Image
              src={g.src}
              alt={g.alt ?? `Gallery image ${idx + 1}`}
              fill
              className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="bg-surface/90 p-2 rounded-full transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                <ZoomIn className="h-5 w-5 text-ink" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.alt ?? "画像の拡大表示"}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="閉じる"
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
                type="button"
                aria-label="前の画像"
              >
                <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" />
              </button>
              <button
                onClick={showNext}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors z-50 hover:bg-white/10 rounded-full"
                type="button"
                aria-label="次の画像"
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
