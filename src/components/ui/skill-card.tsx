import Image from "next/image";
import { cn } from "@/lib/utils";

type SkillItem = {
  name: string;
  experience: string;
  description: string;
};

export function SkillCard({ item }: { item: SkillItem }) {
  return (
    <div
      className={cn(
        "group relative p-6 rounded-2xl bg-white/40 border border-white/20 backdrop-blur-md",
        "transition-all duration-500 ease-out",
        "hover:bg-white/60 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
      )}
    >
      <div className="absolute top-4 right-6 text-[10px] font-bold tracking-widest text-blue-500/60">
        {item.experience}
      </div>

      <div className="relative space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-[13px] font-bold tracking-[0.1em] text-black/80">
              {item.name}
            </h3>
          </div>
          <p className="text-[13px] leading-relaxed text-black/60 font-medium">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
