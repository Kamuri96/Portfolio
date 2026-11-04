"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Header = () => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-bg/80 border-b border-line">
      <div className="mx-auto flex max-w-[980px] items-center justify-between gap-4 px-4 sm:px-6 h-16">
        <Link
          href="/"
          className="font-hud text-xl font-bold text-ink hover:text-accent transition-colors"
        >
          kamuri
        </Link>
        <div className="flex items-center">
          <nav className="flex gap-5 sm:gap-8 font-hud text-sm tracking-[0.04em] text-ink-2">
            {[
              { href: "/works", label: "Works" },
              { href: "/profile", label: "Profile" },
              { href: "/articles", label: "Articles" },
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
        </div>
      </div>
    </header>
  );
};
