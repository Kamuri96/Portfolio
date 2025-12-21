import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ThumbGrid({
  items,
  hrefPrefix,
  className,
}: {
  items: { id: string; title: string; image: string }[];
  hrefPrefix: string;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-3 gap-4", className)}>
      {items.map((it) => (
        <Link key={it.id} href={`${hrefPrefix}/${it.id}`} className="block">
          <Card className="overflow-hidden rounded-none border-black/10 bg-white shadow-none transition hover:border-black/20">
            <div className="relative w-full">
              <Image
                src={it.image}
                alt={it.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 200px"
              />
            </div>
            <p>{it.title}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
