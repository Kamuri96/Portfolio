"use client";
// サイト全体の背景のごく薄い方眼。マウスの近くだけ歪む（モニターのガラスに触れたような手ざわり）
//
// - 歪みを描くのはマウスが動いたあとの短い間だけ。収まったら描画を止める
// - タブが裏にあるときは描かない
// - タッチ端末・動きを減らす設定では、静止した方眼を 1 回描くだけ
import { useEffect, useRef } from "react";

const CELL = 32; // 方眼の間隔（px）
const STEP = 8; // 線を折れ線で描くときの細かさ（px）
const RADIUS = 140; // 歪みが届く範囲（px）
const STRENGTH = 16; // 歪みの大きさ（px）
const DECAY = 0.93; // 1 フレームごとの歪みの減り方
const BASE_ALPHA = 0.07;

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const interactive =
      matchMedia("(pointer: fine)").matches &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let mx = -1e4;
    let my = -1e4;
    let power = 0;
    let raf = 0;

    const offset = (x: number, y: number): [number, number] => {
      if (power < 0.01) return [0, 0];
      const dx = x - mx;
      const dy = y - my;
      const d2 = dx * dx + dy * dy;
      if (d2 > RADIUS * RADIUS * 4) return [0, 0];
      const d = Math.sqrt(d2) || 1;
      const f = power * Math.exp(-d2 / (RADIUS * RADIUS)) * STRENGTH;
      return [(dx / d) * f, (dy / d) * f];
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      // 縦線と横線
      for (const vertical of [true, false]) {
        const count = Math.ceil((vertical ? w : h) / CELL) + 1;
        const length = vertical ? h : w;
        for (let i = 0; i < count; i++) {
          const pos = i * CELL + 0.5;
          const near = power > 0.01 && Math.abs(pos - (vertical ? mx : my)) < RADIUS * 1.5;
          ctx.strokeStyle = `rgba(63, 227, 234, ${near ? BASE_ALPHA + power * 0.12 : BASE_ALPHA})`;
          ctx.beginPath();
          if (!near) {
            // 歪みの届かない線はまっすぐ 1 本で描く
            if (vertical) {
              ctx.moveTo(pos, 0);
              ctx.lineTo(pos, length);
            } else {
              ctx.moveTo(0, pos);
              ctx.lineTo(length, pos);
            }
          } else {
            for (let t = 0; t <= length + STEP; t += STEP) {
              const x = vertical ? pos : t;
              const y = vertical ? t : pos;
              const [ox, oy] = offset(x, y);
              if (t === 0) ctx.moveTo(x + ox, y + oy);
              else ctx.lineTo(x + ox, y + oy);
            }
          }
          ctx.stroke();
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const loop = () => {
      power *= DECAY;
      draw();
      if (power > 0.01 && !document.hidden) {
        raf = requestAnimationFrame(loop);
      } else {
        power = 0;
        raf = 0;
        draw();
      }
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      power = 1;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    if (interactive) window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10 h-full w-full" aria-hidden />;
}
