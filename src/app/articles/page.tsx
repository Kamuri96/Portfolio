import { SectionTitle } from "@/components/ui/section-title";
import { articles } from "@/lib/data";
import { ThumbGrid } from "@/components/ui/work-grid";

export default function ArticlesPage() {
  return (
    <div className="space-y-6">
      <SectionTitle className="mt-8">ARTICLES</SectionTitle>
      <div className="mx-auto max-w-[900px]">
        <ThumbGrid items={articles} hrefPrefix="/articles" type="articles" />
      </div>
    </div>
  );
}
