import Image from "next/image";
import { getProfile } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";
import type { Metadata } from "next";

const profile = getProfile();

export const metadata: Metadata = {
  title: "Profile",
  description: `${profile.handle}（${profile.name}）のプロフィール・経歴・スキル。`,
};

export default function ProfilePage() {
  return (
    <div className="space-y-20 pb-24 pt-10">
      <section className="space-y-10">
        <SectionHeading as="h1">PROFILE</SectionHeading>
        <div className="grid gap-8 sm:grid-cols-[160px_1fr] sm:items-start">
          <div className="relative aspect-square w-40 overflow-hidden bg-black">
            <Image src="/img/icon.webp" alt={`${profile.handle} のアイコン`} fill className="object-cover" sizes="160px" priority />
            <div className="screen-scan absolute inset-0" aria-hidden />
            <div className="screen-corners absolute inset-2 [--s:16px]" aria-hidden />
          </div>
          <div className="space-y-5">
            <div>
              <p className="glow font-hud text-5xl font-bold text-ink">{profile.handle}</p>
              <p className="mt-2 text-sm text-ink-2">
                {profile.name}
                <span className="ml-3 font-hud text-xs tracking-[0.1em] text-ink-3">{profile.title}</span>
              </p>
            </div>
            <div className="max-w-[36em] space-y-3">
              {profile.about.map((p, i) => (
                <p key={i} className="text-[15px] leading-8 text-ink-2">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading>EXPERIENCE</SectionHeading>
        <ol className="m-0 list-none p-0">
          {profile.experiences.map((ex, i) => (
            <li key={i} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-line py-4 sm:grid-cols-[7rem_1fr_auto]">
              <span className="font-hud text-sm tabular-nums text-ink-3">{ex.period}</span>
              <span className="text-[15px] text-ink">{ex.headline}</span>
              {ex.detail && (
                <span className="col-start-2 text-sm text-accent sm:col-start-auto">{ex.detail}</span>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <SectionHeading>SKILLS</SectionHeading>
        <dl className="m-0">
          {profile.skills.map((s) => (
            <div key={s.name} className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-b border-line py-4 sm:grid-cols-[12rem_5rem_1fr]">
              <dt className="font-hud text-[15px] font-bold text-ink">{s.name}</dt>
              <dd className="m-0 font-hud text-sm text-ink-3 sm:order-none">{s.since}~</dd>
              <dd className="col-span-2 m-0 text-sm text-ink-2 sm:col-span-1">{s.description}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
