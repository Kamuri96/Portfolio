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

export type Profile = {
  name: string;
  title: string;
  bio: string;
  about: string[];
  experiences: {
    period: string;
    headline: string;
    detail?: string;
  }[];
};

export type SkillItem = {
  name: string;
  icon: string;
  experience: string;
  description: string;
};

export const works: WorkItem[] = [
  {
    id: "w1",
    title: "全世界VTuber計画!?",
    image: "/img/AllVPlan_hero.png",
    tag: "GAME",
  },
  {
    id: "w2",
    title: "天使と悪魔のTODOリスト",
    image: "/img/Angel_Devil_Todo_hero.jpg",
    tag: "PRODUCT",
  },
  { id: "w3", title: "Cocoiko", image: "/img/cocoiko.png", tag: "WEB" },
  {
    id: "w4",
    title: "Colorful Umiushi",
    image: "/img/umiushi.png",
    tag: "GAME",
  },
  { id: "w5", title: "バトム", image: "/img/battm.png", tag: "GAME" },
  {
    id: "w6",
    title: "いっぱい食べるキミが好き！",
    image: "/img/ippai_taberu.png",
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

export const profile: Profile = {
  name: "中村 美月",
  title: "Engineer / Designer",
  bio: "自身のかわいいと遊びの体験を追求するクリエイター",
  about: [
    "小さい頃から絵を描いたり、物を作ったりすることがで好きです。",
    "分野にとらわれない「ものづくり」に取り組んでおり、ゲーム制作、イラスト、Web開発、映像、3Dモデル、金属加工など様々なものづくりに興味を持ち、勉強しています。",
  ],
  experiences: [
    {
      period: "2025",
      headline: "ポートフォリオ制作",
      detail: "Next.js + shadcn/ui + Tailwind で構築",
    },
    {
      period: "2024",
      headline: "ワークショップ運営/制作",
      detail: "子どもの創作体験を支援するコンテンツ制作",
    },
  ],
};

export const skillItems: SkillItem[] = [
  {
    name: "Unity",
    icon: "/icons/ps.png",
    experience: "2022~",
    description: "個人/チームでのゲーム制作、指導の経験",
  },
  {
    name: "Ruby",
    icon: "/icons/ps.png",
    experience: "2025~",
    description: "Ruby on Railsでの就業型インターン経験",
  },
  {
    name: "Next.js / React",
    icon: "/icons/ps.png",
    experience: "2024~",
    description: "Webサイト制作",
  },
  {
    name: "Figma",
    icon: "/icons/ps.png",
    experience: "2024~",
    description: "ワイヤー〜UI設計",
  },
  {
    name: "Photoshop",
    icon: "/icons/ps.png",
    experience: "2023~",
    description: "UI制作、ポスターデザイン、グッズデザインなど",
  },
  {
    name: "ClipStudioPaint",
    icon: "/icons/ps.png",
    experience: "2023~",
    description: "イラスト制作、ロゴ制作、UI制作など",
  },
];
