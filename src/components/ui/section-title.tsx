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
        "text-center text-[12px] tracking-[0.25em] text-black/80",
        className
      )}
    >
      {children}
    </h2>
  );
}
