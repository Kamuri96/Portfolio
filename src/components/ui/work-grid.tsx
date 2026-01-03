import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ThumbGrid({
  items,
  hrefPrefix,
  className,
  type = "works",
}: {
  items: { id: string; title: string; image: string }[];
  hrefPrefix: string;
  className?: string;
  type?: "works" | "articles";
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10",
        className
      )}
    >
      {items.map((it, index) => (
        <Link
          key={it.id}
          href={`${hrefPrefix}/${it.id}`}
          className="group block animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <div className="flex flex-col gap-5">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-black/[0.02] shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-blue-500/10">
              <Image
                src={it.image}
                alt={it.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            {/* 2. テキスト部分を少し内側に寄せ、画像との結びつきを強める */}
            <div className="space-y-2 px-1">
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-4 bg-blue-500/50 transition-all duration-500 group-hover:w-8 group-hover:bg-blue-500" />
                <p className="text-[10px] font-bold tracking-[0.2em] text-blue-500 uppercase">
                  {type === "works" ? "View Project" : "Read Article"}
                </p>
              </div>
              <h3 className="text-[15px] font-medium leading-snug text-black/80 tracking-tight transition-colors group-hover:text-black">
                {it.title}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
