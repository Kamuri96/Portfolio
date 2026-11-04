import { getArticles } from "@/lib/articles";
import { ArticleList } from "@/components/ArticleList";
import { SectionHeading } from "@/components/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description: "note・Qiita などに投稿した記事の一覧。",
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="space-y-4 pb-24 pt-10">
      <SectionHeading as="h1">ARTICLES</SectionHeading>
      <ArticleList initialArticles={articles} />
    </div>
  );
}
