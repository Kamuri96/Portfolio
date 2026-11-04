"use client";
// 画像の拡大表示。作品のギャラリーとイラストギャラリーで共用する
//
// - 開くと閉じるボタンにフォーカスし、閉じると開く前の要素に戻す
// - Tab はダイアログ内に閉じ込める。← → で前後、Esc で閉じる。スマホは左右にスワイプ
// - 開いている間は背景をスクロールさせない
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export type LightboxItem = {
  src: string;
  alt: string;
  /** 画面上部の左に出す短いラベル（種類など） */
  label?: string;
  /** 画面下部に出す説明（題名・年など） */
  caption?: React.ReactNode;
};

export function useLightbox(count: number) {
  const [index, setIndex] = useState<number | null>(null);
  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? null : (i - 1 + count) % count)),
    [count]
  );
  const next = useCallback(() => setIndex((i) => (i === null ? null : (i + 1) % count)), [count]);
  return { index, open, close, prev, next };
}

type Props = {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const SWIPE_THRESHOLD = 40;

export function Lightbox({ items, index, onClose, onPrev, onNext }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const isOpen = index !== null;
  const item = isOpen ? items[index] : null;

  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const buttons = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>("button, a[href]") ?? []
        );
        if (buttons.length === 0) return;
        const i = buttons.indexOf(document.activeElement as HTMLElement);
        const nextIndex = e.shiftKey
          ? i <= 0 ? buttons.length - 1 : i - 1
          : i === buttons.length - 1 ? 0 : i + 1;
        e.preventDefault();
        buttons[nextIndex].focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!item) return null;
  const multiple = items.length > 1;
  const navButton =
    "border border-white/25 px-3 py-1.5 font-hud text-xs tracking-[0.1em] text-white/80 transition-colors hover:border-accent hover:text-accent";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-[100] grid grid-rows-[auto_1fr_auto] bg-black/95 px-4 py-4 animate-in fade-in duration-200 sm:px-8 sm:py-6"
      onClick={onClose}
    >
      <div className="flex items-center justify-between font-hud text-xs tracking-[0.12em] text-accent">
        <span>{item.label}</span>
        <button ref={closeRef} type="button" aria-label="閉じる" className={navButton} onClick={onClose}>
          CLOSE ✕
        </button>
      </div>

      <div
        className="relative my-4 min-h-0"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null || !multiple) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > SWIPE_THRESHOLD) (dx < 0 ? onNext : onPrev)();
          touchX.current = null;
        }}
      >
        <Image
          key={item.src}
          src={item.src}
          alt={item.alt}
          fill
          sizes="100vw"
          className="object-contain p-3 animate-in fade-in zoom-in-95 duration-300 sm:p-6"
          priority
        />
      </div>

      <div
        className="flex flex-wrap items-end justify-between gap-3 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0">{item.caption ?? <p className="text-sm">{item.alt}</p>}</div>
        {multiple && (
          <div className="flex gap-2">
            <button type="button" aria-label="前の画像" className={navButton} onClick={onPrev}>
              ← PREV
            </button>
            <button type="button" aria-label="次の画像" className={navButton} onClick={onNext}>
              NEXT →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
