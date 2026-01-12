import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type WorkItem = {
  id: string;
  title: string;
  image: string;
};

type ArticleItem = {
  id: string;
  title: string;
  image: string;
  pubDate: string;
  platformName: string;
};

type ThumbGridProps = {
  hrefPrefix: string;
  className?: string;
} & (
  | { type: "works"; items: WorkItem[] }
  | { type: "articles"; items: ArticleItem[] }
);

export function ThumbGrid(props: ThumbGridProps) {
  const { items, hrefPrefix, className, type = "works" } = props;

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10",
        className
      )}
    >
      {items.map((it, index) => {
        const isExternal = it.id.startsWith("http");
        const href = isExternal ? it.id : `${hrefPrefix}/${it.id}`;

        return (
          <Link
            key={it.id}
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="group block animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {type === "works" ? (
              <div className="flex flex-col gap-5">
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-black/10 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-blue-500/10">
                  <Image
                    src={it.image}
                    alt={it.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <div className="space-y-2 px-1">
                  <div className="flex items-center gap-2">
                    <span className="h-0.5 w-4 bg-blue-500/50 transition-all duration-500 group-hover:w-8 group-hover:bg-blue-500" />
                    <p className="text-[10px] font-bold tracking-[0.2em] text-blue-500 uppercase">
                      View Project
                    </p>
                  </div>
                  <h3 className="text-[15px] font-medium leading-snug text-black/80 tracking-tight transition-colors group-hover:text-black whitespace-pre-line">
                    {it.title}
                  </h3>
                </div>
              </div>
            ) : (
              <article className="h-full flex flex-col justify-between p-6 rounded-2xl bg-white/40 border border-white/20 backdrop-blur-md transition-all duration-500 hover:bg-white/60 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative h-6 w-6 overflow-hidden rounded-full border border-black/5 bg-white">
                      <Image
                        src={it.image}
                        alt={(it as ArticleItem).platformName || "icon"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-blue-500/80">
                      {(it as ArticleItem).platformName}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-bold leading-snug text-black/90 line-clamp-3 group-hover:text-blue-600 transition-colors">
                    {it.title}
                  </h3>
                </div>
                <div className="mt-6 flex items-center justify-end border-t border-blue-500/10 pt-4">
                  <time className="text-[11px] font-medium text-black/40 tracking-wider">
                    {(it as ArticleItem).pubDate}
                  </time>
                </div>
              </article>
            )}
          </Link>
        );
      })}
    </div>
  );
}
