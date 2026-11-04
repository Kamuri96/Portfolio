"use client";
// ヒーローの映像の上に重ねる WebGL の演出。チャンネルが切り替わる瞬間だけ、
// 色のずれ（RGB）・横方向のずれ・走査線の揺れ・ノイズをかけ、終わったら非表示に戻る。
//
// - ライブラリは使わず、WebGL1 の小さなシェーダーだけ
// - 画面に入っていないとき・動きを減らす設定のときは動かさない
// - WebGL が使えない環境では何もしない（呼び出し側の CSS の砂嵐が代わりに出る）
import { useEffect, useImperativeHandle, useRef } from "react";

const DURATION_MS = 420;

const VERTEX = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAGMENT = `
precision mediump float;
uniform sampler2D uTex;
uniform vec2 uScale;   // object-fit: cover と同じ切り抜き
uniform vec2 uOffset;
uniform float uAmt;    // 演出の強さ（1 → 0）
uniform float uTime;
varying vec2 vUv;
float rand(vec2 c) { return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  vec2 uv = vUv * uScale + uOffset;
  // 横方向にずれる帯
  float row = floor(vUv.y * 28.0);
  float band = step(0.55, rand(vec2(row, floor(uTime * 24.0))));
  uv.x += (rand(vec2(row, uTime)) - 0.5) * 0.08 * uAmt * band;
  // 色のずれ
  float ca = 0.014 * uAmt;
  float r = texture2D(uTex, uv + vec2(ca, 0.0)).r;
  float g = texture2D(uTex, uv).g;
  float b = texture2D(uTex, uv - vec2(ca, 0.0)).b;
  vec3 col = vec3(r, g, b);
  // 走査線の揺れとノイズ
  col *= 0.9 + 0.1 * sin(vUv.y * 900.0 + uTime * 60.0);
  col += (rand(vUv * (uTime + 1.0)) - 0.5) * 0.25 * uAmt;
  // 下の画像（opacity 0.7）と同じ明るさにそろえる
  gl_FragColor = vec4(col * 0.7, 1.0);
}`;

/** play は演出を引き受けたら true を返す（false なら呼び出し側で代わりの演出を出す） */
export type ScreenGlitchHandle = { play: (src: string) => boolean };

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, source);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

export function ScreenGlitch({ ref }: { ref: React.Ref<ScreenGlitchHandle> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playRef = useRef<(src: string) => boolean>(() => false);

  useImperativeHandle(ref, () => ({ play: (src) => playRef.current(src) }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: false, antialias: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    // 2 のべき乗でない画像でも使えるようにする
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const u = {
      scale: gl.getUniformLocation(program, "uScale"),
      offset: gl.getUniformLocation(program, "uOffset"),
      amt: gl.getUniformLocation(program, "uAmt"),
      time: gl.getUniformLocation(program, "uTime"),
    };

    // ヒーローが画面に入っているときだけ動かす
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    let raf = 0;
    let token = 0;
    const images = new Map<string, HTMLImageElement>();
    const load = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const cached = images.get(src);
        if (cached?.complete) return resolve(cached);
        const img = cached ?? new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        if (!cached) {
          img.src = src;
          images.set(src, img);
        }
      });

    const run = async (src: string, my: number) => {
      let img: HTMLImageElement;
      try {
        img = await load(src);
      } catch {
        return;
      }
      if (my !== token) return;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);

      // object-fit: cover と同じ見え方になるように切り抜く
      const ia = img.naturalWidth / img.naturalHeight;
      const ca = w / h;
      const sx = ia > ca ? ca / ia : 1;
      const sy = ia > ca ? 1 : ia / ca;
      gl.uniform2f(u.scale, sx, sy);
      gl.uniform2f(u.offset, (1 - sx) / 2, (1 - sy) / 2);

      cancelAnimationFrame(raf);
      canvas.style.opacity = "1";
      const start = performance.now();
      const frame = (now: number) => {
        if (my !== token) return;
        const p = Math.min(1, (now - start) / DURATION_MS);
        gl.uniform1f(u.amt, (1 - p) * (1 - p));
        gl.uniform1f(u.time, now / 1000);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        if (p < 1) raf = requestAnimationFrame(frame);
        else canvas.style.opacity = "0";
      };
      raf = requestAnimationFrame(frame);
    };

    playRef.current = (src) => {
      if (!visible || document.hidden) return false;
      void run(src, ++token);
      return true;
    };

    return () => {
      token++;
      cancelAnimationFrame(raf);
      io.disconnect();
      playRef.current = () => false;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
      aria-hidden
    />
  );
}
