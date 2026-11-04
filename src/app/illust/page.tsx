import type { Metadata } from "next";
import { getIllustrations } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";
import { IllustGallery } from "@/components/IllustGallery";

export const metadata: Metadata = {
  title: "Illust",
  description: "イラストの一覧。",
};

export default async function IllustPage() {
  const items = await getIllustrations();

  return (
    <div className="space-y-8 pb-24 pt-10">
      <SectionHeading as="h1">ILLUST</SectionHeading>
      {items.length > 0 ? (
        <IllustGallery items={items} filterable />
      ) : (
        <p className="py-10 text-center text-ink-3">イラストはまだありません。</p>
      )}
    </div>
  );
}
