import { getIllustrations, getProfile, getWorks } from "@/lib/content";
import { getArticles } from "@/lib/articles";
import { ChannelHero, type Channel } from "@/components/ChannelHero";
import { SectionHeading } from "@/components/SectionHeading";
import { WorkGrid } from "@/components/WorkCard";
import { ArticleList } from "@/components/ArticleList";
import { IllustGallery } from "@/components/IllustGallery";
import { BootScreen } from "@/components/BootScreen";

const HERO_CHANNELS = 5;
const TOP_ARTICLES = 4;
const TOP_ILLUSTRATIONS = 6;

export default async function TopPage() {
  const allArticles = await getArticles();
  const works = getWorks();
  const profile = getProfile();
  const illustrations = (await getIllustrations()).slice(0, TOP_ILLUSTRATIONS);
  const channels: Channel[] = works.slice(0, HERO_CHANNELS).map((w) => ({
    slug: w.slug,
    title: w.title,
    category: w.category,
    year: w.year,
    image: w.cover,
  }));

  return (
    <div className="space-y-28 pb-24 pt-2">
      <BootScreen />
      <ChannelHero name={profile.handle} title={profile.title} channels={channels} />

      <section className="space-y-8">
        <SectionHeading moreHref="/works">WORKS</SectionHeading>
        <WorkGrid works={works} />
      </section>

      {illustrations.length > 0 && (
        <section className="space-y-8">
          <SectionHeading moreHref="/illust">ILLUST</SectionHeading>
          <IllustGallery items={illustrations} />
        </section>
      )}

      <section className="space-y-4">
        <SectionHeading moreHref="/articles">ARTICLES</SectionHeading>
        <ArticleList initialArticles={allArticles} limit={TOP_ARTICLES} />
      </section>
    </div>
  );
}
