import Link from "next/link";

type Props = {
  children: React.ReactNode;
  /** 右端の「ALL →」のリンク先。省略すると表示しない */
  moreHref?: string;
  /** ページの主見出しとして使うとき h1 にする */
  as?: "h1" | "h2";
};

export function SectionHeading({ children, moreHref, as: Tag = "h2" }: Props) {
  return (
    <div className="flex items-end justify-between border-b border-line pb-3">
      <Tag className="font-hud text-3xl font-bold tracking-wide text-ink">{children}</Tag>
      {moreHref && (
        <Link href={moreHref} className="font-hud text-sm text-ink-2 hover:text-accent">
          ALL →
        </Link>
      )}
    </div>
  );
}
