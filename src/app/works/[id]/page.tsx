import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { works } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, ArrowLeft } from "lucide-react"; // アイコンを導入
import { cn } from "@/lib/utils";

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
      <h3 className="text-[11px] font-bold tracking-[0.2em] text-blue-600/80 uppercase">
        {title}
      </h3>
      <div className="text-[14px] leading-relaxed text-black/70">
        {children}
      </div>
    </div>
  );
}

export default async function WorkDetailPage({ params }: Props) {
  const resolved = await resolveParams(params);
  const work = works.find((w) => w.id === resolved.id);
  if (!work) return notFound();

  return (
    <div className="mx-auto max-w-[1000px] space-y-16 pb-20 animate-in fade-in duration-700">
      {/* Header */}
      <div className="text-center space-y-4 pt-10">
        <div className="text-[11px] font-bold tracking-[0.4em] text-blue-500 uppercase">
          {work.tag}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-black/90 md:text-4xl">
          {work.title}
        </h1>
      </div>

      {/* Main Visual - 画像比率問題の解決 */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-blue-50/50 border border-blue-100/20 shadow-2xl shadow-blue-500/5">
        <Image
          src={work.image}
          alt={work.title}
          fill
          className="object-contain p-4 sm:p-8" // 全体を見せつつ余白を持たせる
          sizes="100vw"
          priority
        />
      </div>

      {/* Details Grid */}
      <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
        <div className="space-y-12">
          {work.overview && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold border-l-4 border-blue-500 pl-4">
                Overview
              </h2>
              <p className="text-[15px] leading-relaxed text-black/70 whitespace-pre-line">
                {work.overview}
              </p>
            </section>
          )}

          {/* ギャラリー */}
          {work.gallery?.length ? (
            <section className="space-y-6">
              <h2 className="text-lg font-bold border-l-4 border-blue-500 pl-4">
                Gallery
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {work.gallery.map((g, idx) => (
                  <div
                    key={idx}
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-blue-50/30 border border-blue-100/20"
                  >
                    <Image
                      src={g.src}
                      alt={g.alt ?? ""}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        {/* Sidebar */}
        <aside className="h-fit space-y-8 rounded-3xl bg-blue-50/40 p-8 border border-blue-100/30 backdrop-blur-sm">
          <InfoBlock title="Details">
            <div className="space-y-5">
              {work.period && (
                <div>
                  <p className="text-[10px] text-black/40 mb-1 font-bold">
                    PERIOD
                  </p>
                  <p className="font-medium">{work.period}</p>
                </div>
              )}
              {work.role && (
                <div>
                  <p className="text-[10px] text-black/40 mb-2 font-bold tracking-[0.1em]">
                    ROLE
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {work.role
                      .split(/[,、/ ]/)
                      .filter(Boolean)
                      .map((r) => (
                        <span
                          key={r}
                          className="inline-flex items-center rounded-md bg-blue-500/5 px-2 py-1 text-[11px] font-medium text-blue-600 border border-blue-500/10"
                        >
                          {r}
                        </span>
                      ))}
                  </div>
                </div>
              )}
              {work.tech?.length && (
                <div>
                  <p className="text-[10px] text-black/40 mb-1 font-bold">
                    TECH STACK
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {work.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-white px-2 py-1 text-[10px] font-bold tracking-wider text-blue-600 border border-blue-100"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </InfoBlock>

          {work.links?.length && (
            <>
              <Separator className="bg-blue-200/20" />
              <div className="space-y-3">
                {work.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl bg-white p-3 text-xs font-bold tracking-widest text-black/70 shadow-sm transition-all hover:bg-blue-500 hover:text-white"
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

      {/* Footer Back Button */}
      <div className="flex justify-center pt-10 border-t border-black/[0.03]">
        <Link
          href="/works"
          className="group flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] text-black/40 hover:text-blue-500 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          BACK TO WORKS
        </Link>
      </div>
    </div>
  );
}
