import Parser from "rss-parser";

const parser = new Parser();

export type ArticleItem = {
  id: string;
  title: string;
  image: string;
  pubDate: string;
  platformName: string;
};

const FEEDS = [
  {
    platform: "Qiita",
    url: "https://qiita.com/Kamuri96/feed",
    icon: "https://cdn.qiita.com/assets/favicons/public/production-c620d3e403342b1022967ba5e3db1aaa.ico",
  },
  {
    platform: "Zenn",
    url: "https://zenn.dev/kamuri96/feed",
    icon: "https://zenn.dev/images/logo-transparent.png",
  },
  {
    platform: "note",
    url: "https://note.com/kamuri_96/rss",
    icon: "https://assets.st-note.com/poc-image/manual/note-common-images/production/svg/production.ico",
  },
];

export async function getArticles(): Promise<ArticleItem[]> {
  const results = await Promise.allSettled(
    FEEDS.map(async (feed): Promise<ArticleItem[]> => {
      const data = await parser.parseURL(feed.url);
      return data.items.map((item) => ({
        id: item.link ?? "",
        title: item.title ?? "",
        image: feed.icon,
        pubDate: item.pubDate
          ? new Date(item.pubDate)
              .toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\//g, ".")
          : "",
        platformName: feed.platform,
      }));
    })
  );
  const allArticles = results.reduce<ArticleItem[]>((acc, res) => {
    if (res.status === "fulfilled") {
      return [...acc, ...res.value];
    }
    return acc;
  }, []);

  // 新しい順にソート
  return allArticles.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
}
