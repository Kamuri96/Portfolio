"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Header = () => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/60 border-b border-black/[0.03]">
      <div className="mx-auto flex max-w-[900px] items-center justify-between px-8 h-16">
        <Link
          href="/"
          className="text-[13px] font-bold tracking-[0.3em] hover:opacity-70 transition-opacity"
        >
          PORTFOLIO
        </Link>
        <nav className="flex gap-8 text-[10px] tracking-[0.2em] font-medium text-black/50">
          {[
            { href: "/profile", label: "PROFILE" },
            { href: "/works", label: "WORKS" },
            { href: "/articles", label: "ARTICLES" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-all duration-300 hover:text-blue-500 relative py-1",
                pathname.startsWith(item.href) &&
                  "text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-blue-500"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
