import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SectionTitle } from "@/components/ui/section-title";
import { works, articles } from "@/lib/data";
import { ThumbGrid } from "@/components/ui/work-grid";
import { Card } from "@/components/ui/card";

const latestWorks = works.slice(-3).reverse();
const latestArticles = articles.slice(0, 3);

function SectionHeader({
  title,
  href,
  hrefLabel = "VIEW ALL",
}: {
  title: string;
  href: string;
  hrefLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <SectionTitle>{title}</SectionTitle>
      <Link
        href={href}
        className="text-[11px] tracking-[0.18em] text-black/60 underline hover:text-black"
      >
        {hrefLabel}
      </Link>
    </div>
  );
}

export default function TopPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section aria-label="Hero" className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="overflow-hidden rounded-none border-black/10 bg-white p-0 shadow-none">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/hero.png"
                alt="ポートフォリオのキービジュアル"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 720px"
                priority
              />
            </div>
          </Card>

          <div className="flex flex-col justify-center gap-4">
            <div>
              <p className="text-[12px] tracking-[0.25em] text-black/60">
                PORTFOLIO
              </p>
              <h1 className="mt-2 text-xl font-medium leading-tight text-black/90">
                体験を形にするデザインと実装
              </h1>
              <p className="mt-3 text-sm leading-7 text-black/70">
                ゲーム・Webアプリ・プロダクトなど、遊び心を大切にしながら制作しています。
                作品の背景や意図が伝わるよう、情報設計も重視しています。
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/works"
                className="inline-flex items-center justify-center rounded-none border border-black/15 bg-black px-4 py-2 text-xs tracking-[0.18em] text-white hover:bg-black/90"
              >
                WORKS を見る
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-none border border-black/15 bg-white px-4 py-2 text-xs tracking-[0.18em] text-black/70 hover:bg-black/5"
              >
                PROFILE
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-black/10" />

      {/* Profile teaser */}
      <section className="space-y-4" aria-label="Profile">
        <SectionTitle>PROFILE</SectionTitle>

        <div className="mx-auto grid max-w-[820px] gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
          <Avatar className="h-20 w-20 border border-black/10">
            <AvatarImage src="/img/icon.png" alt="プロフィール画像" />
          </Avatar>

          <div className="space-y-2">
            <p className="text-sm leading-7 text-black/75">
              筑波大学大学院デザイン学学位プログラムでプロダクトデザインを学んでいます。
              遊び心を大切にしながら、ゲーム・Webアプリケーション・プロダクトなど、
              様々なものづくりに取り組んでいます。
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

      {/* Works */}
      <section className="space-y-4" aria-label="Latest works">
        <SectionHeader title="WORKS" href="/works" />
        <div className="mx-auto max-w-[820px]">
          <ThumbGrid items={latestWorks} hrefPrefix="/works" />
        </div>
      </section>

      <Separator className="bg-black/10" />

      {/* Articles */}
      <section className="space-y-4" aria-label="Latest articles">
        <SectionHeader title="ARTICLES" href="/articles" />
        <div className="mx-auto max-w-[820px]">
          <ThumbGrid items={latestArticles} hrefPrefix="/articles" />
        </div>
      </section>
    </div>
  );
}
