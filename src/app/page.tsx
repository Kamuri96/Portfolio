import { getProfile, getWorks } from "@/lib/content";
import { getArticles } from "@/lib/articles";
import { ChannelHero, type Channel } from "@/components/ChannelHero";
import { SectionHeading } from "@/components/SectionHeading";
import { WorkGrid } from "@/components/WorkCard";
import { ArticleList } from "@/components/ArticleList";

const HERO_CHANNELS = 5;
const TOP_ARTICLES = 4;

export default async function TopPage() {
  const allArticles = await getArticles();
  const works = getWorks();
  const channels: Channel[] = works.slice(0, HERO_CHANNELS).map((w) => ({
    slug: w.slug,
    title: w.title,
    category: w.category,
    year: w.year,
    image: w.cover,
  }));

  return (
    <div className="space-y-28 pb-24 pt-2">
      <ChannelHero name={getProfile().handle} channels={channels} />

      <section className="space-y-8">
        <SectionHeading moreHref="/works">WORKS</SectionHeading>
        <WorkGrid works={works} />
      </section>

      <section className="space-y-4">
        <SectionHeading moreHref="/articles">ARTICLES</SectionHeading>
        <ArticleList initialArticles={allArticles} limit={TOP_ARTICLES} />
      </section>
    </div>
  );
}
