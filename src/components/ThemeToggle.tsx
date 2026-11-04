"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

// 描画前に data-theme を決めるスクリプト（layout.tsx の <head> に埋め込む）。
// 保存された選択 → OS の設定 の順に決める
export const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`;

// <html data-theme> を状態の置き場所として扱う
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";
const getServerTheme = (): Theme | null => null;

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, getServerTheme);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // 保存できない環境（プライベートブラウズなど）では今回の表示だけ切り替える
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="ダークモード"
      aria-pressed={theme === null ? undefined : theme === "dark"}
      className="-m-2 p-2 text-ink-3 transition-colors hover:text-ink"
    >
      <Moon className="h-4 w-4 dark:hidden" aria-hidden />
      <Sun className="hidden h-4 w-4 dark:block" aria-hidden />
    </button>
  );
}
