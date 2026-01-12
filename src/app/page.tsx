import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SectionTitle } from "@/components/ui/section-title";
import { works } from "@/lib/data";
import { ThumbGrid } from "@/components/ui/work-grid";
import { getArticles } from "@/lib/rss";
import { HeroSlider } from "@/components/ui/HeroSlider";

export default async function TopPage() {
  const latestWorks = works.slice(-3).reverse();
  const allArticles = await getArticles();
  const latestArticles = allArticles.slice(0, 3);
  const heroImages = latestWorks.map((w) => w.image);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <HeroSlider images={heroImages} />
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-1000">
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

      {/* Plofile Section */}
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
      <section className="space-y-10">
        <div className="flex items-baseline justify-between border-b border-black/5 pb-4">
          <SectionTitle>WORKS</SectionTitle>
        </div>
        <ThumbGrid items={latestWorks} hrefPrefix="/works" type="works" />
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

      <Separator className="bg-black/10" />

      <section className="space-y-10">
        <div className="flex items-baseline justify-between border-b border-black/5 pb-4">
          <SectionTitle>ARTICLES</SectionTitle>
        </div>
        <ThumbGrid
          items={latestArticles}
          hrefPrefix="/articles"
          type="articles"
        />
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
