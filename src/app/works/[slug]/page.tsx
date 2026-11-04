import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWork, getWorks } from "@/lib/content";
import { WorkGallery } from "@/components/ui/WorkGallery";
import type { Metadata } from "next";
import { BASE_OPEN_GRAPH, ogImage } from "@/lib/site";

type Params = { slug: string };
type Props = { params: Params | Promise<Params> };

async function resolveParams(params: Props["params"]) {
  return params instanceof Promise ? await params : params;
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-4 border-t border-line py-4">
      <dt className="font-hud text-xs tracking-[0.1em] text-ink-3">{label}</dt>
      <dd className="m-0 text-sm text-ink">{children}</dd>
    </div>
  );
}

export async function generateStaticParams() {
  return getWorks().map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await resolveParams(params);
  const work = getWork(resolved.slug);
  if (!work) return {};
  const title = work.title;
  const description = work.body.flat().join("");
  return {
    title,
    description,
    openGraph: {
      ...BASE_OPEN_GRAPH,
      title,
      description,
      images: [ogImage(work.cover)],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const resolved = await resolveParams(params);
  const work = getWork(resolved.slug);
  if (!work) return notFound();
  const title = work.title;

  return (
    <article className="space-y-14 pb-24 pt-10">
      <header className="space-y-3">
        <p className="flex gap-3 font-hud text-sm tracking-[0.1em]">
          <span className="text-accent">{work.category}</span>
          <span className="text-ink-3">{work.year}</span>
        </p>
        <h1 className="text-3xl font-bold leading-tight text-ink sm:text-5xl">{title}</h1>
      </header>

      {/* メインの画像は画面の中に映す */}
      <div className="relative -mx-4 aspect-video overflow-hidden bg-black sm:mx-0 sm:rounded-md">
        <Image
          src={work.cover}
          alt={title}
          fill
          className="object-contain p-6 sm:p-12"
          sizes="(max-width: 980px) 100vw, 980px"
          priority
        />
        <div className="screen-scan absolute inset-0" aria-hidden />
        <div className="screen-corners absolute inset-3 sm:inset-5" aria-hidden />
      </div>

      <div className="grid gap-14 lg:grid-cols-[1fr_300px]">
        <div className="space-y-14">
          {work.body.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-hud text-lg font-bold tracking-[0.1em] text-ink">OVERVIEW</h2>
              {work.body.map((lines, i) => (
                <p key={i} className="text-[15px] leading-8 text-ink-2">
                  {lines.map((line, j) => (
                    <span key={j}>
                      {j > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </p>
              ))}
            </section>
          )}

          {work.gallery.length > 0 && (
            <section className="space-y-6">
              <h2 className="font-hud text-lg font-bold tracking-[0.1em] text-ink">GALLERY</h2>
              <WorkGallery items={work.gallery} />
            </section>
          )}
        </div>

        <aside className="h-fit">
          <dl className="m-0 border-b border-line">
            <InfoRow label="PERIOD">
              <span className="font-hud">{work.period}</span>
            </InfoRow>
            <InfoRow label="TEAM">{work.client}</InfoRow>
            <InfoRow label="ROLE">{work.role.join(" / ")}</InfoRow>
            {work.tech.length > 0 && (
              <InfoRow label="TECH">
                <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                  {work.tech.map((t) => (
                    <li key={t} className="border border-line px-2 py-0.5 font-hud text-xs text-ink-2">
                      {t}
                    </li>
                  ))}
                </ul>
              </InfoRow>
            )}
            {work.links.length > 0 && (
              <InfoRow label="LINKS">
                <ul className="m-0 grid list-none gap-2 p-0">
                  {work.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink underline decoration-line underline-offset-4 hover:text-accent hover:decoration-accent"
                      >
                        {l.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </InfoRow>
            )}
          </dl>
        </aside>
      </div>

      <div className="border-t border-line pt-8">
        <Link href="/works" className="font-hud text-sm tracking-[0.1em] text-ink-2 hover:text-accent">
          ← WORKS
        </Link>
      </div>
    </article>
  );
}
