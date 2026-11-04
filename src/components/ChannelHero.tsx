"use client";
// トップのヒーロー。最新作をテレビのチャンネルのように切り替えて映す
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type Channel = {
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string;
};

const SWITCH_INTERVAL_MS = 5000;

function useClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("ja-JP", { timeZone: "Asia/Tokyo", hour12: false });
    const t = setInterval(() => setNow(fmt()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function NameBlock({ name }: { name: string }) {
  return (
    <>
      <p className="font-hud text-xs tracking-[0.3em] text-accent sm:text-sm">
        GAME / ILLUST / DEVICE / WORKSHOP
      </p>
      <h1 className="glow mt-2 font-hud text-[64px] font-bold leading-[0.9] text-white sm:text-[120px]">
        {name}
      </h1>
    </>
  );
}

function NowOnAir({ ch }: { ch: Channel }) {
  return (
    <Link href={`/works/${ch.slug}`} className="group block text-white">
      <span className="block font-hud text-[10px] tracking-[0.12em] text-white/70 sm:text-xs">
        NOW ON AIR
      </span>
      <span className="text-[15px] font-bold group-hover:text-accent sm:text-xl">{ch.title}</span>
      <span className="ml-3 font-hud text-xs text-white/70 sm:text-sm">{ch.year}</span>
    </Link>
  );
}

function ChannelButtons({
  channels,
  idx,
  onSelect,
}: {
  channels: Channel[];
  idx: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex gap-1.5" role="group" aria-label="映す作品を切り替える">
      {channels.map((c, i) => (
        <button
          key={c.slug}
          type="button"
          onClick={() => onSelect(i)}
          aria-pressed={i === idx}
          aria-label={`${c.title} を映す`}
          className={`h-8 w-9 border font-hud text-xs transition-colors ${
            i === idx
              ? "border-accent bg-accent text-on-accent"
              : "border-white/30 text-white/80 hover:border-accent hover:text-accent"
          }`}
        >
          {String(i + 1).padStart(2, "0")}
        </button>
      ))}
    </div>
  );
}

export function ChannelHero({ name, channels }: { name: string; channels: Channel[] }) {
  const [idx, setIdx] = useState(0);
  const [switching, setSwitching] = useState(false);
  const clock = useClock();
  const ch = channels[idx];

  const go = useCallback((next: number) => {
    setSwitching(true);
    setIdx(next);
    setTimeout(() => setSwitching(false), 260);
  }, []);

  useEffect(() => {
    // 動きを減らす設定のときは自動で切り替えない
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go((idx + 1) % channels.length), SWITCH_INTERVAL_MS);
    return () => clearInterval(t);
  }, [idx, channels.length, go]);

  return (
    <section className="-mx-4 sm:mx-0">
      {/* スマホ：名前 → 映像 → 切り替えボタン の順 */}
      <div className="px-4 pb-6 pt-2 sm:hidden">
        <NameBlock name={name} />
      </div>

      {/* PC とスマホで同じ 16:9 の映像枠 */}
      <div className="relative aspect-video overflow-hidden bg-black sm:rounded-md">
        {channels.map((c, i) => (
          <Image
            key={c.slug}
            src={c.image}
            alt={i === idx ? c.title : ""}
            aria-hidden={i !== idx}
            fill
            priority={i === 0}
            sizes="(max-width: 980px) 100vw, 980px"
            className={`object-cover transition-opacity duration-300 ${i === idx ? "opacity-70" : "opacity-0"}`}
          />
        ))}
        <div className="screen-shade absolute inset-0" />
        <div className={`screen-static absolute inset-0 ${switching ? "opacity-100" : "opacity-0"}`} aria-hidden />
        <div className="screen-scan absolute inset-0" aria-hidden />
        <div className="screen-corners absolute inset-3 sm:inset-5" aria-hidden />

        <div className="absolute inset-x-5 top-4 flex items-center justify-between font-hud text-[11px] tracking-[0.12em] text-accent sm:inset-x-8 sm:top-8 sm:text-xs">
          <span>{ch.category}</span>
          <span className="flex items-center gap-4">
            <span className="text-signal">
              <span className="blink mr-1.5" aria-hidden>
                ●
              </span>
              LIVE
            </span>
            <span className="tabular-nums">{clock ?? "--:--:--"} JST</span>
          </span>
        </div>

        {/* スマホ：作品名は映像の中に重ねる */}
        <div className="absolute inset-x-5 bottom-4 sm:hidden">
          <NowOnAir ch={ch} />
        </div>

        {/* PC：名前・作品名・ボタンをすべて映像の上に */}
        <div className="absolute inset-x-8 bottom-9 hidden sm:block">
          <NameBlock name={name} />
          <div className="mt-5 flex items-end justify-between gap-4">
            <NowOnAir ch={ch} />
            <ChannelButtons channels={channels} idx={idx} onSelect={go} />
          </div>
        </div>
      </div>

      <div className="flex justify-end px-4 pt-3 sm:hidden">
        <ChannelButtons channels={channels} idx={idx} onSelect={go} />
      </div>
    </section>
  );
}
