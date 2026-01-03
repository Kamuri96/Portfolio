import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { works } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Params = { id: string };
type Props = { params: Params | Promise<Params> };

function isPromise<T>(v: T | Promise<T>): v is Promise<T> {
  return v instanceof Promise;
}

function InfoBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-black/85">{title}</h3>
      <div className="text-sm leading-7 text-black/70">{children}</div>
    </div>
  );
}

export default async function WorkDetailPage({ params }: Props) {
  const resolved = isPromise(params) ? await params : params;

  const work = works.find((w) => w.id === resolved.id);
  if (!work) return notFound();

  return (
    <div className="space-y-10">
      <div className="text-center">
        <div className="text-[12px] tracking-[0.25em] text-black/70 mt-8">
          WORKS
        </div>
        <h1 className="mt-3 text-lg font-medium text-black/85">{work.title}</h1>

        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <Badge className="rounded-full border border-black/15 bg-white text-[10px] tracking-[0.18em] text-black/70 shadow-none">
            {work.tag}
          </Badge>
          {work.client ? (
            <Badge className="rounded-full border border-black/15 bg-white text-[10px] tracking-[0.18em] text-black/70 shadow-none">
              {work.client}
            </Badge>
          ) : null}
        </div>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* HERO */}
        <Card className="overflow-hidden rounded-none border-black/10 bg-white p-0 shadow-none">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={work.image}
              alt={work.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
          </div>
        </Card>

        {/* 概要 */}
        <div className="space-y-6">
          {work.overview && (
            <>
              <InfoBlock title="概要">
                <p className="whitespace-pre-line">{work.overview}</p>
              </InfoBlock>
              <Separator className="bg-black/15" />
            </>
          )}

          {work.tech?.length ? (
            <>
              <InfoBlock title="使用技術">
                <div className="flex flex-wrap gap-2">
                  {work.tech.map((t) => (
                    <Badge
                      key={t}
                      className="rounded-full border border-black/15 bg-white text-[10px] tracking-[0.18em] text-black/70 shadow-none"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </InfoBlock>
              <Separator className="bg-black/15" />
            </>
          ) : null}

          {work.period ? (
            <>
              <InfoBlock title="制作期間">{work.period}</InfoBlock>
              <Separator className="bg-black/15" />
            </>
          ) : null}

          {work.role ? (
            <InfoBlock title="担当した箇所">{work.role}</InfoBlock>
          ) : null}
        </div>
      </div>

      <div className="space-y-4">
        {work.links?.length ? (
          <div className="flex flex-wrap gap-4 text-sm">
            {work.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 underline underline-offset-4 hover:text-blue-700"
              >
                {l.label}
                <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        ) : null}
      </div>

      <Separator className="bg-black/10" />
      {/* ギャラリー */}
      {work.gallery?.length ? (
        <section className="space-y-4">
          <div className="text-sm font-medium text-black/70">ギャラリー</div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {work.gallery.map((g, idx) => (
              <Card
                key={`${g.src}-${idx}`}
                className="overflow-hidden rounded-none border-black/10 bg-white p-0 shadow-none"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={g.src}
                    alt={g.alt ?? `${work.title} image ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 48vw"
                  />
                </div>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {/* Back */}
      <div className="pt-2 text-center">
        <Link
          href="/works"
          className="text-[11px] tracking-[0.18em] text-black/60 hover:text-black"
        >
          BACK TO WORKS
        </Link>
      </div>
    </div>
  );
}
