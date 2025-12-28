import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SectionTitle } from "@/components/ui/section-title";
import { works, articles } from "@/lib/data";
import { ThumbGrid } from "@/components/ui/work-grid";

export default function TopPage() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="mx-auto w-full max-w-[520px]">
        <div className="relative w-full border border-black/10 bg-white">
          <Image
            src="/hero.png"
            alt="Hero"
            fill
            className="object-cover"
            sizes="520px"
            priority
          />
        </div>
      </div>

      <Separator className="bg-black/10" />

      {/* PROFILE */}
      <section className="space-y-4">
        <SectionTitle>PROFILE</SectionTitle>
        <div className="flex justify-center">
          <Avatar className="h-20 w-20 border border-white/10">
            <AvatarImage src="/img/icon.png" alt="avatar" />
          </Avatar>
          <div className="mx-5">
            <p>
              筑波大学大学院デザイン学学位プログラムでプロダクトデザインを学んでいます。
              <br />
              遊び心を大切にしながら、ゲーム・Webアプリケーション・プロダクトなど、
              <br />
              様々なものづくりに取り組んでいます。
            </p>
          </div>
        </div>
      </section>

      <Separator className="bg-black/10" />

      {/* WORKS */}
      <section className="space-y-4">
        <div className="flex items-center justify-center gap-3">
          <SectionTitle>WORKS</SectionTitle>
        </div>
        <div className="mx-auto max-w-[730px] flex items-center justify-center">
          <ThumbGrid items={works.slice(0, 3)} hrefPrefix="/works" />
        </div>
        <div className="flex items-center justify-center">
          <Link
            href="/works"
            className="text-[10px] tracking-[0.18em] text-black/60 hover:text-black"
          >
            VIEW ALL
          </Link>
        </div>
      </section>

      <Separator className="bg-black/10" />

      {/* ARTICLES */}
      <section className="space-y-4">
        <div className="flex items-center justify-center gap-3">
          <SectionTitle>ARTICLES</SectionTitle>
        </div>
        <div className="mx-auto max-w-[730px] flex items-center justify-center">
          <ThumbGrid items={articles.slice(0, 3)} hrefPrefix="/articles" />
        </div>
        <div className="flex items-center justify-center">
          <Link
            href="/works"
            className="text-[10px] tracking-[0.18em] text-black/60 hover:text-black"
          >
            VIEW ALL
          </Link>
        </div>
      </section>

      <Separator className="bg-black/10" />

      {/* CONTACT */}
      <section className="space-y-3">
        <SectionTitle>CONTACT</SectionTitle>
        <p className="text-center text-xs text-black/70">
          お問い合わせはX(旧Twitter)のDMまでお願いします。
          <br />
          ご依頼の場合は詳細とご希望納期、ご予算などもお願いいたします。
        </p>
      </section>
    </div>
  );
}
