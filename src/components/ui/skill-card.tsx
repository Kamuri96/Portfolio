type SkillItem = {
  name: string;
  experience: string;
  description: string;
};

export function SkillCard({ item }: { item: SkillItem }) {
  return (
    <div className="relative rounded-lg border border-line bg-surface p-6">
      <div className="absolute top-4 right-6 text-[10px] font-bold tracking-widest text-ink-3">
        {item.experience}
      </div>

      <div className="space-y-2">
        <h3 className="text-[13px] font-bold tracking-[0.1em] text-ink">
          {item.name}
        </h3>
        <p className="text-[13px] leading-relaxed text-ink-2 font-medium">
          {item.description}
        </p>
      </div>
    </div>
  );
}
