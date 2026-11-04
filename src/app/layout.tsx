import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { bootInitScript } from "@/components/BootScreen";
import { GridBackground } from "@/components/GridBackground";
import {
  BASE_OPEN_GRAPH,
  ogImage,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  TITLE_TEMPLATE,
} from "@/lib/site";

// 見出し・ラベル・数字用。本文は日本語のシステムフォント（globals.css の --font-jp）
const chakra = Chakra_Petch({
  variable: "--font-chakra",
  weight: ["500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: TITLE_TEMPLATE,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    ...BASE_OPEN_GRAPH,
    images: [ogImage("/img/icon.webp")],
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // 起動演出の有無を描画前のスクリプトで <html data-boot> に書くため、サーバーの HTML と差が出る
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootInitScript }} />
      </head>
      <body
        className={`${chakra.variable} antialiased`}
      >
        <GridBackground />
        <a href="#main" className="skip-link">
          本文へスキップ
        </a>
        <Header />

        <main
          id="main"
          className="mx-auto w-full max-w-[980px] px-4 sm:px-6"
        >
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
