import { SectionTitle } from "@/components/ui/section-title";
import { getArticles } from "@/lib/rss";
import { ThumbGrid } from "@/components/ui/work-grid";

export const revalidate = 86400;

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="space-y-6">
      <SectionTitle className="mt-8">ARTICLES</SectionTitle>
      <div className="mx-auto max-w-[820px]">
        {" "}
        {articles.length > 0 ? (
          <ThumbGrid items={articles} hrefPrefix="/articles" type="articles" />
        ) : (
          <p className="text-center text-black/50 py-10">
            記事が見つかりませんでした。
          </p>
        )}
      </div>
    </div>
  );
}
