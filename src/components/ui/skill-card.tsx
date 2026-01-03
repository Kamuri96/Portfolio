import { cn } from "@/lib/utils";

export function SkillCard({
  item,
}: {
  item: { name: string; description: string };
}) {
  return (
    <div
      className={cn(
        "p-6 rounded-2xl bg-white/40 border border-black/[0.03] backdrop-blur-sm", // 角丸を2xlに、背景を半透明に
        "transition-all duration-300 ease-out", // アニメーションを滑らかに
        "hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1" // ホバー時の浮き上がり
      )}
    >
      <h4 className="text-[11px] font-bold tracking-[0.2em] text-blue-500 mb-3 uppercase">
        {item.name}
      </h4>
      <p className="text-sm text-black/60 leading-relaxed italic">
        {item.description}
      </p>
    </div>
  );
}
