import type { Metadata } from "next";
import { TITLE_TEMPLATE } from "@/lib/site";

// works/page.tsx はクライアントコンポーネントで metadata を書けないため、ここで設定する。
// 作品詳細ページは generateMetadata で上書きする。
export const metadata: Metadata = {
  // 文字列で上書きすると子ページにテンプレートが引き継がれないため、default と template で指定する
  title: { default: "Works", template: TITLE_TEMPLATE },
  description: "ゲーム・Webアプリケーション・プロダクトなどの制作作品一覧。",
};

export default function WorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
