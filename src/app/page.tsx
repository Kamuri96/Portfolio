import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SectionTitle } from "@/components/ui/section-title";
import { works } from "@/lib/data";
import { ThumbGrid } from "@/components/ui/work-grid";
import { getArticles } from "@/lib/articles";
import { HeroSlider } from "@/components/ui/HeroSlider";
import { ArticleList } from "@/components/ArticleList";
import { toPlainText } from "@/lib/site";

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between border-b border-line pb-4">
      <SectionTitle>{children}</SectionTitle>
    </div>
  );
}

function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-center pt-4">
      <Link
        href={href}
        className="group flex items-center gap-4 text-[11px] tracking-[0.3em] text-ink-3 hover:text-accent transition-colors duration-300"
      >
        <span className="h-px w-8 bg-line transition-all group-hover:w-12 group-hover:bg-accent" />
        {children}
      </Link>
    </div>
  );
}

export default async function TopPage() {
  const latestWorks = works.slice(-3).reverse();
  const allArticles = await getArticles();
  const heroSlides = latestWorks.map((w) => ({
    src: w.image,
    alt: toPlainText(w.title),
  }));

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <HeroSlider slides={heroSlides} />
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-1000">
            <div>
              <p className="text-[12px] font-bold tracking-[0.4em] text-ink-3 uppercase">
                PORTFOLIO
              </p>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-ink lg:text-4xl whitespace-pre-line">
                体験を形にする{"\n"}デザインと実装
              </h1>
              <p className="mt-6 text-sm leading-8 text-ink-2 whitespace-pre-line">
                多角的な視点を持つことを大切に、{"\n"}
                遊び心を大切に、ものづくりに取り組んでいます。
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/works"
                className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-3 text-xs font-bold tracking-widest text-bg transition-colors hover:bg-accent hover:text-on-accent"
              >
                VIEW WORKS
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-full border border-line bg-surface px-8 py-3 text-xs font-bold tracking-widest text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
              >
                PROFILE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="space-y-10">
        <SectionHeader>PROFILE</SectionHeader>
        <div className="grid gap-8 md:grid-cols-[auto_1fr] items-center">
          <Avatar className="h-24 w-24 border border-line">
            <AvatarImage src="/img/icon.webp" alt="プロフィール画像" />
          </Avatar>
          <div className="space-y-2">
            <p className="text-sm leading-7 text-ink-2">
              筑波大学大学院デザイン学学位プログラムでプロダクトデザインを学んでいます。
              <br />
              遊び心を大切にしながら、ゲーム・Webアプリケーション・プロダクトなど、
              <br />
              分野にとらわれない様々なものづくりに取り組んでいます。
            </p>
            <Link
              href="/profile"
              className="inline-block text-[11px] tracking-[0.18em] text-ink-2 underline hover:text-accent"
            >
              プロフィール詳細を見る
            </Link>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section className="space-y-10">
        <SectionHeader>WORKS</SectionHeader>
        <ThumbGrid items={latestWorks} hrefPrefix="/works" type="works" />
        <MoreLink href="/works">VIEW ALL WORKS</MoreLink>
      </section>

      <section className="space-y-10">
        <SectionHeader>ARTICLES</SectionHeader>
        <ArticleList initialArticles={allArticles} limit={3} />
        <MoreLink href="/articles">READ ALL ARTICLES</MoreLink>
      </section>
    </div>
  );
}
