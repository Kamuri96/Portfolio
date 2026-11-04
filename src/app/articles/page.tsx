import { SectionTitle } from "@/components/ui/section-title";
import { getArticles } from "@/lib/articles";
import { ArticleList } from "@/components/ArticleList";

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="space-y-6">
      <SectionTitle className="mt-8">ARTICLES</SectionTitle>
      <div className="mx-auto max-w-[820px]">
        <ArticleList initialArticles={articles} />
      </div>
    </div>
  );
}
