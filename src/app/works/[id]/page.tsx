import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { works } from "@/lib/data";
import { WorkGallery } from "@/components/ui/WorkGallery";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { BASE_OPEN_GRAPH, ogImage, toPlainText } from "@/lib/site";

type Params = { id: string };
type Props = { params: Params | Promise<Params> };

async function resolveParams(params: Props["params"]) {
  return params instanceof Promise ? await params : params;
}

function InfoBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-[11px] font-bold tracking-[0.2em] text-ink-3 uppercase">
        {title}
      </h3>
      <div className="text-[14px] leading-relaxed text-ink-2">
        {children}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return works.map((work) => ({
    id: work.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await resolveParams(params);
  const work = works.find((w) => w.id === resolved.id);
  if (!work) return {};
  const title = toPlainText(work.title);
  const description = toPlainText(work.overview);
  return {
    title,
    description,
    openGraph: {
      ...BASE_OPEN_GRAPH,
      title,
      description,
      images: [ogImage(work.image)],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const resolved = await resolveParams(params);
  const work = works.find((w) => w.id === resolved.id);
  if (!work) return notFound();

  return (
    <div className="mx-auto max-w-[1000px] space-y-16 pb-20 animate-in fade-in duration-700">
      {/* Header */}
      <div className="text-center space-y-4 pt-10">
        <div className="text-[11px] font-bold tracking-[0.4em] text-ink-3 uppercase">
          {work.tag}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
          {work.title}
        </h1>
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-subtle">
        <Image
          src={work.image}
          alt={work.title}
          fill
          className="object-contain p-4 sm:p-8"
          sizes="100vw"
          priority
        />
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
        <div className="space-y-12">
          {work.overview && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-ink border-l-4 border-ink pl-4">
                Overview
              </h2>
              <p className="text-[15px] leading-relaxed text-ink-2 whitespace-pre-line">
                {work.overview}
              </p>
            </section>
          )}

          {work.gallery?.length ? (
            <section className="space-y-6">
              <h2 className="text-lg font-bold text-ink border-l-4 border-ink pl-4">
                Gallery
              </h2>
              {work.gallery?.length ? (
                <WorkGallery items={work.gallery} />
              ) : null}
            </section>
          ) : null}
        </div>

        <aside className="h-fit space-y-8 rounded-lg bg-subtle p-8">
          <InfoBlock title="Details">
            <div className="space-y-5">
              {work.period && (
                <div>
                  <p className="text-[10px] text-ink-3 mb-1 font-bold">
                    PERIOD
                  </p>
                  <p className="font-medium">{work.period}</p>
                </div>
              )}
              {work.role && (
                <div>
                  <p className="text-[10px] text-ink-3 mb-2 font-bold tracking-[0.1em]">
                    ROLE
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {work.role
                      .split(/[,、/ ]/)
                      .filter(Boolean)
                      .map((r) => (
                        <span
                          key={r}
                          className="inline-flex items-center rounded-md bg-surface px-2 py-1 text-[11px] font-medium text-ink-2 border border-line"
                        >
                          {r}
                        </span>
                      ))}
                  </div>
                </div>
              )}
              {work.tech.length > 0 && (
                <div>
                  <p className="text-[10px] text-ink-3 mb-1 font-bold">
                    TECH STACK
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {work.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-surface px-2 py-1 text-[10px] font-bold tracking-wider text-ink-2 border border-line"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </InfoBlock>

          {work.links && work.links.length > 0 && (
            <>
              <Separator className="bg-line" />
              <div className="space-y-3">
                {work.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-lg border border-line bg-surface p-3 text-xs font-bold tracking-widest text-ink-2 transition-colors hover:border-accent hover:bg-accent hover:text-on-accent"
                  >
                    {l.label}
                    <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </>
          )}
        </aside>
      </div>

      <div className="flex justify-center pt-10 border-t border-line">
        <Link
          href="/works"
          className="group flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] text-ink-3 hover:text-accent transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          BACK TO WORKS
        </Link>
      </div>
    </div>
  );
}
