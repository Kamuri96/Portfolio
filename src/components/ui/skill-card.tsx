import Image from "next/image";
import { Card } from "@/components/ui/card";

type SkillItem = {
  name: string;
  icon: string;
  experience: string;
  description: string;
};

export function SkillCard({ item }: { item: SkillItem }) {
  return (
    <Card className="rounded-none border-black/10 bg-white p-0 shadow-none overflow-hidden">
      <div className="flex items-stretch">
        {/* left: round icon */}
        <div className="flex w-[128px] shrink-0 items-center justify-center border-r border-black/10 px-4 py-5">
          <div className="h-14 w-14 overflow-hidden rounded-full bg-white ring-1 ring-black/10">
            <Image
              src={item.icon}
              alt={item.name}
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* right: text */}
        <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-4">
          <h3 className="text-sm font-medium text-black/85">{item.name}</h3>
          <span className="mt-1 text-[11px] tracking-[0.14em] text-black/55">
            {item.experience}
          </span>
          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-black/70">
            {item.description}
          </p>
        </div>
      </div>
    </Card>
  );
}
