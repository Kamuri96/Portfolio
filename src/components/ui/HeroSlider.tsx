"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Slide = { src: string; alt: string };

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    // 動きを減らす設定のときは自動で切り替えない
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-2xl bg-black/5 animate-in fade-in duration-1000">
      {slides.map((slide, idx) => (
        <div
          key={slide.src}
          aria-hidden={idx !== currentIdx}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            idx === currentIdx ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={idx === 0}
          />
        </div>
      ))}
      <div
        aria-hidden
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2"
      >
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "h-1 transition-all duration-500 rounded-full",
              idx === currentIdx ? "w-6 bg-white" : "w-2 bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
