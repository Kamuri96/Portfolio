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
          <Card className="overflow-hidden rounded-none border-black/10 bg-white shadow-none transition hover:border-black/20 p-0 h-50 w-45">
            <div className="relative h-25 w-full">
              <Image
                src={it.image}
                alt={it.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 200px"
              />
            </div>
            <div className="text-center">
              <p>{it.title}</p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
