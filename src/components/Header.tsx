"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "TOP" },
  { href: "/profile", label: "PROFILE" },
  { href: "/works", label: "WORKS" },
  { href: "/articles", label: "ARTICLES" },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full">
      <div className="mx-auto flex max-w-[820px] items-center justify-center px-6 pt-6">
        <nav className="flex gap-4 text-[11px] tracking-[0.18em] text-black/70">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition hover:text-black",
                  active && "text-black font-medium"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
