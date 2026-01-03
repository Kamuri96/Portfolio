import Link from "next/link";
import { Separator } from "@/components/ui/separator";

type FooterLink = { label: string; href: string; external?: boolean };

const navLinks: FooterLink[] = [
  { label: "TOP", href: "/" },
  { label: "PROFILE", href: "/profile" },
  { label: "WORKS", href: "/works" },
  { label: "ARTICLES", href: "/articles" },
  { label: "CONTACT", href: "/contact" },
];

const socialLinks: FooterLink[] = [
  { label: "X", href: "https://x.com/Kamuri_96", external: true },
  { label: "GitHub", href: "https://github.com/Kamuri96", external: true },
  { label: "Qiita", href: "https://qiita.com/Kamuri96", external: true },
  { label: "Zenn", href: "https://zenn.dev/kamuri96", external: true },
];

function FooterLinks({ links }: { links: FooterLink[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
      {links.map((l) =>
        l.external ? (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[0.18em] text-black/60 hover:text-black"
          >
            {l.label}
          </a>
        ) : (
          <Link
            key={l.href}
            href={l.href}
            className="text-[11px] tracking-[0.18em] text-black/60 hover:text-black"
          >
            {l.label}
          </Link>
        )
      )}
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10">
      <div className="mx-auto max-w-[820px] px-6">
        <Separator className="bg-black/10" />

        <div className="py-10">
          <FooterLinks links={navLinks} />

          <div className="mt-5">
            <FooterLinks links={socialLinks} />
          </div>

          <p className="mt-6 text-center text-[11px] tracking-[0.18em] text-black/45">
            © {year} Mitsuki Nakamura All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
