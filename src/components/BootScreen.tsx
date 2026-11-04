"use client";
// トップを開いたときの起動演出（電波を探して、チャンネルが合う）
//
// 表示するかどうかは layout.tsx の <head> のスクリプト（bootInitScript）が描画前に決め、
// <html data-boot> を付ける。付いていなければこの要素は CSS で非表示のまま
import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1100;
const STORAGE_KEY = "kamuri:booted";
export const BOOT_DONE_EVENT = "kamuri:boot-done";

/** セッション中の初回だけ・トップだけ・動きを減らす設定でないときだけ data-boot を付ける */
export const bootInitScript = `(function(){try{if(location.pathname==="/"&&!sessionStorage.getItem("${STORAGE_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.boot="1"}}catch(e){}})()`;

export function BootScreen() {
  const barRef = useRef<HTMLSpanElement>(null);
  const [channel, setChannel] = useState("--");
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.dataset.boot) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // 保存できなくても演出は 1 回で終わる
    }

    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION_MS);
      if (barRef.current) barRef.current.style.width = `${p * 100}%`;
      if (p < 0.8) {
        setChannel(String(Math.floor(Math.random() * 99)).padStart(2, "0"));
      } else {
        setChannel("01");
        setLocked(true);
      }
      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        root.dataset.boot = "out";
        setTimeout(() => {
          delete root.dataset.boot;
          window.dispatchEvent(new Event(BOOT_DONE_EVENT));
        }, 350);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="boot-screen fixed inset-0 z-[90] place-items-center bg-black" aria-hidden>
      <div className="screen-scan absolute inset-0" />
      <div className="grid w-[min(70%,360px)] gap-2 font-hud text-xs tracking-[0.12em] text-accent">
        <span>{locked ? "SIGNAL LOCKED" : "SEARCHING SIGNAL..."}</span>
        <span className="block h-0.5 overflow-hidden bg-accent/20">
          <span ref={barRef} className="block h-full w-0 bg-accent" />
        </span>
        <span className="tabular-nums text-ink-3">CH {channel}</span>
      </div>
    </div>
  );
}
