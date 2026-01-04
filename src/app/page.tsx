"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SectionTitle } from "@/components/ui/section-title";
import { works, articles } from "@/lib/data";
import { ThumbGrid } from "@/components/ui/work-grid";
import { cn } from "@/lib/utils";

const latestWorks = works.slice(-3).reverse();
const latestArticles = articles.slice(0, 3);

export default function TopPage() {
  const heroImages = latestWorks.map((w) => w.image);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div className="space-y-24 pb-20">
      <section aria-label="Hero" className="relative pt-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-2xl bg-black/5 animate-in fade-in duration-1000">
            {heroImages.map((src, idx) => (
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
                  sizes="(max-width: 1024px) 100vw, 720px"
                  priority={idx === 0}
                />
              </div>
            ))}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {heroImages.map((_, idx) => (
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

          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-1000 ease-out">
            <div>
              <p className="text-[12px] font-bold tracking-[0.4em] text-blue-500/80 uppercase">
                PORTFOLIO
              </p>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-black/90 lg:text-4xl whitespace-pre-line">
                体験を形にする{"\n"}デザインと実装
              </h1>
              <p className="mt-6 text-sm leading-8 text-black/60 whitespace-pre-line">
                多角的な視点を持つことを大切に、{"\n"}
                遊び心を大切にしたデジタル体験を制作しています。
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/works"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-black px-8 py-3 text-xs font-bold tracking-widest text-white transition-all hover:bg-blue-600 shadow-lg shadow-black/5"
              >
                VIEW WORKS
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/50 px-8 py-3 text-xs font-bold tracking-widest text-black/70 backdrop-blur-sm transition-all hover:bg-white hover:border-blue-300 shadow-lg shadow-black/5"
              >
                PROFILE
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <section className="rounded-3xl bg-blue-50/50 p-8 md:p-12 border border-blue-100/50">
        <SectionTitle className="mb-8">PROFILE</SectionTitle>
        <div className="grid gap-8 md:grid-cols-[auto_1fr] items-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full" />
            <Avatar className="h-24 w-24 border-2 border-white shadow-lg">
              <AvatarImage src="/img/icon.png" alt="プロフィール画像" />
            </Avatar>
          </div>
          <div className="space-y-2">
            <p className="text-sm leading-7 text-black/75">
              筑波大学大学院デザイン学学位プログラムでプロダクトデザインを学んでいます。
              <br />
              遊び心を大切にしながら、ゲーム・Webアプリケーション・プロダクトなど、
              <br />
              分野にとらわれない様々なものづくりに取り組んでいます。
            </p>
            <Link
              href="/profile"
              className="inline-block text-[11px] tracking-[0.18em] text-black/60 underline hover:text-black"
            >
              プロフィール詳細を見る
            </Link>
          </div>
        </div>
      </section>
      <Separator className="bg-black/10" />

      {/* Works Section */}
      <section className="space-y-10" aria-label="Latest works">
        <div className="flex items-baseline justify-between border-b border-black/[0.03] pb-4">
          <SectionTitle>WORKS</SectionTitle>
        </div>

        <div className="mx-auto max-w-[900px]">
          <ThumbGrid items={latestWorks} hrefPrefix="/works" type="works" />
        </div>

        <div className="flex justify-center pt-4">
          <Link
            href="/works"
            className="group flex items-center gap-4 text-[11px] tracking-[0.3em] text-black/50 hover:text-blue-600 transition-all duration-300"
          >
            <span className="h-[1px] w-8 bg-black/10 transition-all group-hover:w-12 group-hover:bg-blue-600" />
            VIEW ALL WORKS
          </Link>
        </div>
      </section>

      <Separator className="bg-black/[0.05]" />

      {/* Articles Section */}
      <section className="space-y-10" aria-label="Latest articles">
        <div className="flex items-baseline justify-between border-b border-black/[0.03] pb-4">
          <SectionTitle>ARTICLES</SectionTitle>
        </div>

        <div className="mx-auto max-w-[900px]">
          <ThumbGrid
            items={latestArticles}
            hrefPrefix="/articles"
            type="articles"
          />
        </div>

        <div className="flex justify-center pt-4">
          <Link
            href="/articles"
            className="group flex items-center gap-4 text-[11px] tracking-[0.3em] text-black/50 hover:text-blue-600 transition-all duration-300"
          >
            <span className="h-[1px] w-8 bg-black/10 transition-all group-hover:w-12 group-hover:bg-blue-600" />
            READ ALL ARTICLES
          </Link>
        </div>
      </section>
    </div>
  );
}
