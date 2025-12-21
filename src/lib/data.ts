export type WorkItem = {
  id: string;
  title: string;
  image: string;
  tag: "ALL" | "GAME" | "WEB" | "PRODUCT" | "ILLUST" | "OTHER";
  description?: string;
  year?: string;
  tech?: string[];
  links?: { label: string; href: string }[];
};

export type ArticleItem = {
  id: string;
  title: string;
  image: string;
};

export const works: WorkItem[] = [
  { id: "w1", title: "全世界VTuber計画!?", image: "/works/1.png", tag: "GAME" },
  {
    id: "w2",
    title: "田水山小REDESIGNプロジェクト",
    image: "/works/2.png",
    tag: "PRODUCT",
  },
  {
    id: "w3",
    title: "天使と悪魔のTODOリスト",
    image: "/works/3.png",
    tag: "PRODUCT",
  },
  { id: "w4", title: "Colorful Umiushi", image: "/works/4.png", tag: "GAME" },
  { id: "w5", title: "バトム", image: "/works/5.png", tag: "GAME" },
  { id: "w6", title: "Cocoiko", image: "/works/6.png", tag: "WEB" },
  {
    id: "w7",
    title: "いっぱい食べるキミが好き！",
    image: "/works/7.png",
    tag: "GAME",
  },
];

export const articles: ArticleItem[] = [
  { id: "a1", title: "Article 01", image: "/articles/1.png" },
  { id: "a2", title: "Article 02", image: "/articles/2.png" },
  { id: "a3", title: "Article 03", image: "/articles/3.png" },
  { id: "a4", title: "Article 04", image: "/articles/4.png" },
  { id: "a5", title: "Article 05", image: "/articles/5.png" },
  { id: "a6", title: "Article 06", image: "/articles/6.png" },
  { id: "a7", title: "Article 07", image: "/articles/7.png" },
  { id: "a8", title: "Article 08", image: "/articles/8.png" },
  { id: "a9", title: "Article 09", image: "/articles/9.png" },
];
