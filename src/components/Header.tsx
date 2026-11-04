"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-bg/80 border-b border-line">
      <div className="mx-auto flex max-w-[900px] items-center justify-between gap-4 px-4 sm:px-8 h-16">
        <Link
          href="/"
          className="text-[13px] font-bold tracking-[0.3em] text-ink hover:opacity-70 transition-opacity"
        >
          PORTFOLIO
        </Link>
        <div className="flex items-center gap-4 sm:gap-8">
          <nav className="flex gap-4 sm:gap-8 text-[10px] tracking-[0.2em] font-medium text-ink-3">
            {[
              { href: "/profile", label: "PROFILE" },
              { href: "/works", label: "WORKS" },
              { href: "/articles", label: "ARTICLES" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors duration-300 hover:text-ink relative py-1",
                  pathname.startsWith(item.href) &&
                    "text-ink after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-accent"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
