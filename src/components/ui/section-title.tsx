import { cn } from "@/lib/utils";

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-center text-[12px] tracking-[0.25em] text-ink",
        className
      )}
    >
      {children}
    </h2>
  );
}
