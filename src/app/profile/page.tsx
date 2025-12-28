import { profile } from "@/lib/data";
import { SectionTitle } from "@/components/ui/section-title";
import { skillItems } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SkillCard } from "@/components/ui/skill-card";

export default function ProfilePage() {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <SectionTitle className="mt-8">PROFILE</SectionTitle>
        <h1 className="mt-4 text-lg font-medium text-black/85">
          {profile.name}
        </h1>
        <p className="mt-1 text-xs tracking-[0.18em] text-black/60">
          {profile.title}
        </p>
        <p className="mx-auto mt-4 max-w-[560px] text-sm leading-6 text-black/75">
          {profile.bio}
        </p>
      </div>

      <Separator className="bg-black/10" />

      {/* 自己紹介 */}
      <section className="space-y-4">
        <SectionTitle>ABOUT</SectionTitle>
        <div className="mx-auto max-w-[640px] space-y-3">
          {profile.about.map((p, i) => (
            <p key={i} className="text-sm leading-6 text-black/75">
              {p}
            </p>
          ))}
        </div>
      </section>

      <Separator className="bg-black/10" />

      {/* 経歴 */}
      <section className="space-y-4">
        <SectionTitle>EXPERIENCE</SectionTitle>
        <div className="mx-auto grid max-w-[680px] gap-3">
          {profile.experiences.map((ex, i) => (
            <Card
              key={i}
              className="rounded-none border-black/10 bg-white p-4 shadow-none"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 shrink-0 text-[11px] tracking-[0.18em] text-black/60">
                  {ex.period}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-black/85">
                    {ex.headline}
                  </div>
                  {ex.detail ? (
                    <div className="mt-1 text-sm leading-6 text-black/70">
                      {ex.detail}
                    </div>
                  ) : null}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <Separator className="bg-black/10" />
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
