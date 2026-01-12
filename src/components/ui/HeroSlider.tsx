"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function HeroSlider({ images }: { images: string[] }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-2xl bg-black/5 animate-in fade-in duration-1000">
      {images.map((src, idx) => (
        <div
          key={src}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            idx === currentIdx ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <Image
            src={src}
            alt="Selected work"
            fill
            className="object-cover"
            priority={idx === 0}
          />
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, idx) => (
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
