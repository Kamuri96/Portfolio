import { works, profile } from "@/lib/data";
import { getArticles } from "@/lib/articles";
import { ChannelHero, type Channel } from "@/components/ChannelHero";
import { SectionHeading } from "@/components/SectionHeading";
import { WorkGrid } from "@/components/WorkCard";
import { ArticleList } from "@/components/ArticleList";
import { CATEGORY_LABEL, yearOf } from "@/lib/work-meta";
import { toPlainText } from "@/lib/site";

const HERO_CHANNELS = 5;
const TOP_ARTICLES = 4;

export default async function TopPage() {
  const allArticles = await getArticles();
  const latestFirst = [...works].reverse();
  const channels: Channel[] = latestFirst.slice(0, HERO_CHANNELS).map((w) => ({
    id: w.id,
    title: toPlainText(w.title),
    category: CATEGORY_LABEL[w.tag],
    year: yearOf(w.period),
    image: w.image,
  }));

  return (
    <div className="space-y-28 pb-24 pt-2">
      <ChannelHero name={profile.handle} channels={channels} />

      <section className="space-y-8">
        <SectionHeading moreHref="/works">WORKS</SectionHeading>
        <WorkGrid works={latestFirst} />
      </section>

      <section className="space-y-4">
        <SectionHeading moreHref="/articles">ARTICLES</SectionHeading>
        <ArticleList initialArticles={allArticles} limit={TOP_ARTICLES} />
      </section>
    </div>
  );
}
