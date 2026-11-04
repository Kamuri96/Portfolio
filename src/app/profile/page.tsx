import { profile } from "@/lib/data";
import { SectionTitle } from "@/components/ui/section-title";
import { skillItems } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { SkillCard } from "@/components/ui/skill-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: `${profile.name}のプロフィール・経歴・スキル。`,
};

export default function ProfilePage() {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <SectionTitle className="mt-8">PROFILE</SectionTitle>
        <h1 className="mt-4 text-lg font-medium text-ink">
          {profile.name}
        </h1>
        <p className="mt-1 text-xs tracking-[0.18em] text-ink-3">
          {profile.title}
        </p>
        <p className="mx-auto mt-4 max-w-[560px] text-sm leading-6 text-ink-2">
          {profile.bio}
        </p>
      </div>

      <Separator className="bg-line" />
      <section className="space-y-4">
        <SectionTitle>ABOUT</SectionTitle>
        <div className="mx-auto max-w-[640px] space-y-3">
          {profile.about.map((p, i) => (
            <p key={i} className="text-sm leading-6 text-ink-2">
              {p}
            </p>
          ))}
        </div>
      </section>

      <Separator className="bg-line" />

      {/* 経歴 */}
      <section className="space-y-4">
        <SectionTitle>EXPERIENCE</SectionTitle>
        <div className="relative border-l-2 border-line ml-4 pl-8 space-y-7">
          {profile.experiences.map((ex, i) => (
            <div key={i}>
              <span className="text-[10px] font-bold text-ink-3 tracking-widest">
                {ex.period}
              </span>
              <p className="text-base font-bold text-ink mt-1">{ex.headline}</p>
              {ex.detail && (
                <p className="text-sm text-ink-2 mt-2 leading-relaxed">
                  {ex.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
      <Separator className="bg-line" />
      <section className="space-y-4">
        <SectionTitle>SKILLS</SectionTitle>

        <div className="mx-auto grid max-w-[920px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skillItems.map((s) => (
            <SkillCard key={s.name} item={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
