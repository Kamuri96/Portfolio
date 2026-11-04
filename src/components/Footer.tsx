import { profile } from "@/lib/data";

const socialLinks = [
  { label: "X", href: "https://x.com/Kamuri_96" },
  { label: "GitHub", href: "https://github.com/Kamuri96" },
  { label: "note", href: "https://note.com/kamuri_96" },
  { label: "Qiita", href: "https://qiita.com/Kamuri96" },
  { label: "Zenn", href: "https://zenn.dev/kamuri96" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[980px] flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-hud text-2xl font-bold text-ink">{profile.handle}</p>
          <p className="mt-1 font-hud text-xs tracking-[0.1em] text-ink-3">
            © {year} {profile.handle}
          </p>
        </div>
        <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0">
          {socialLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-hud text-sm text-ink-2 hover:text-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
