import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/lib/content";

export function WorkCard({ work }: { work: Work }) {
  return (
    <Link href={`/works/${work.slug}`} className="group block">
      <div className="frame-hover overflow-hidden rounded-sm bg-subtle">
        <div className="relative aspect-[16/10]">
          <Image
            src={work.cover}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
          />
        </div>
      </div>
      <p className="mt-3 flex items-center gap-3 font-hud text-xs tracking-[0.08em] text-ink-3">
        <span className="text-accent">{work.category}</span>
        <span>{work.year}</span>
      </p>
      <h3 className="mt-1 text-[17px] font-bold leading-snug text-ink group-hover:text-accent">
        {work.title}
      </h3>
      <p className="mt-1 text-xs text-ink-3">{work.role.join(" / ")}</p>
    </Link>
  );
}

export function WorkGrid({ works }: { works: Work[] }) {
  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {works.map((w) => (
        <WorkCard key={w.slug} work={w} />
      ))}
    </div>
  );
}
