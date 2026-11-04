import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatDate, type ArticleItem } from "@/lib/articles";

type WorkItem = {
  id: string;
  title: string;
  image: string;
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
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-subtle">
                  <Image
                    src={it.image}
                    alt={it.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="space-y-2 px-1">
                  <div className="flex items-center gap-2">
                    <span className="h-px w-4 bg-line transition-all duration-500 group-hover:w-8 group-hover:bg-accent" />
                    <p className="text-[10px] font-bold tracking-[0.2em] text-ink-3 uppercase">
                      View Project
                    </p>
                  </div>
                  <h3 className="text-[15px] font-medium leading-snug text-ink tracking-tight whitespace-pre-line">
                    {it.title}
                  </h3>
                </div>
              </div>
            ) : (
              <article className="h-full flex flex-col justify-between p-6 rounded-lg border border-line bg-surface transition-colors duration-300 group-hover:border-ink-3">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    {/* 各サービスのアイコンは配色に関係なく白地で表示する */}
                    <div className="relative h-6 w-6 overflow-hidden rounded-full border border-line bg-white">
                      <Image
                        src={it.image}
                        alt={(it as ArticleItem).platformName || "icon"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-ink-3">
                      {(it as ArticleItem).platformName}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-bold leading-snug text-ink line-clamp-3 group-hover:text-accent transition-colors">
                    {it.title}
                  </h3>
                </div>
                <div className="mt-6 flex items-center justify-end border-t border-line pt-4">
                  <time
                    dateTime={(it as ArticleItem).publishedAt}
                    className="text-[11px] font-medium text-ink-3 tracking-wider"
                  >
                    {formatDate((it as ArticleItem).publishedAt)}
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
