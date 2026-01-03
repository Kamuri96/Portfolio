export type WorkItem = {
  id: string;
  title: string;
  image: string;
  tag: "ALL" | "GAME" | "WEB" | "PRODUCT" | "OTHER";
  description?: string;
  /* 詳細 */
  client: string;
  period: string;
  role: string;
  overview: string;
  tech: string[];
  links?: { label: string; href: string }[];
  gallery?: { src: string; alt?: string }[];
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
    title: "いっぱい食べる\nキミが好き！",
    image: "/img/ippai_taberu.png",
    tag: "GAME",
    period: "2022.6 ~ 2022.7",
    client: "個人制作",
    role: "企画 / 実装 / UIデザイン",
    overview:
      "初めての個人制作作品です。\n 時間内にフィールド内のアイテムを拾い、スコアを集める3Dゲームです。\n ゲーム内のUIを全て手描きで制作し、ゲームの世界観を統一しました。",
    tech: ["Unity", "C#"],
    links: [
      { label: "Unityroom", href: "https://unityroom.com/games/ippai_taberu" },
      { label: "GitHub", href: "https://github.com/Kamuri96/OriginalGame" },
    ],
    gallery: [
      { src: "/img/AllVPlan_hero.png", alt: "Hero" },
      { src: "/works/2.png", alt: "Screen" },
    ],
  },
  {
    id: "w2",
    title: "Colorful Umiushi!",
    image: "/img/umiushi.png",
    tag: "GAME",
    period: "2023.2 ~ 2023.3",
    client: "個人制作",
    role: "企画 / 実装 / UIデザイン",
    overview:
      "混ぜ合わせや補色などの、色の性質を用いたパズルゲームです。\n 背景やプレイヤー、ゲーム内オブジェクトを全て手描きし、世界観を統一しました。\n ステージが進むにつれ、色の数や見える範囲を変化させるなど、\nレベルデザインに注意を払いました。",
    tech: ["Unity", "C#"],
    links: [
      {
        label: "Unityroom",
        href: "https://unityroom.com/games/colorful-umiushi",
      },
      { label: "GitHub", href: "https://github.com/Kamuri96/LA_Original" },
    ],
    gallery: [
      { src: "/img/umiushi.png", alt: "Hero" },
      { src: "/works/2.png", alt: "Screen" },
    ],
  },
  {
    id: "w3",
    title: "バトム！",
    image: "/img/battm.png",
    tag: "GAME",
    period: "2023.7",
    client: "個人制作",
    role: "企画 / アニメーション実装 / デザイン",
    overview:
      "技育CAMPハッカソンで制作した作品です。\n 学生が、実験のように手を動かしながらゲーム感覚で化学を勉強できるゲームというコンセプトで制作しました。\n マッチング時やリザルト表示にアニメーションをつけたり、分子のオブジェクトをふわふわ動かしたりなど、常に画面に飽きのこないデザインを心がけました。",
    tech: ["Unity", "C#"],
    links: [
      {
        label: "Unityroom",
        href: "https://unityroom.com/games/batomu",
      },
    ],
    gallery: [
      { src: "/img/battm.png", alt: "Hero" },
      { src: "/works/2.png", alt: "Screen" },
    ],
  },
  {
    id: "w4",
    title: "Cocoiko",
    image: "/img/cocoiko.png",
    tag: "WEB",
    period: "2025",
    client: "個人制作",
    role: "企画 / UI / 実装",
    overview:
      "作品の概要をここに書きます。\n狙い・工夫・結果などを2〜5段落で。",
    tech: ["Unity", "C#", "UI/UX"],
    gallery: [
      { src: "/img/AllVPlan_hero.png", alt: "Hero" },
      { src: "/works/2.png", alt: "Screen" },
    ],
  },
  {
    id: "w5",
    title: "マドライズ",
    image: "/img/Madlize.png",
    tag: "GAME",
    period: "2025",
    client: "個人制作",
    role: "企画 / アプリ実装",
    overview:
      "作品の概要をここに書きます。\n狙い・工夫・結果などを2〜5段落で。",
    tech: ["Unity", "C#", "UI/UX"],
    links: [
      {
        label: "作品紹介ページ",
        href: "https://makezine.jp/event/makers-mft2025/m0128/",
      },
    ],
    gallery: [
      { src: "/img/AllVPlan_hero.png", alt: "Hero" },
      { src: "/works/2.png", alt: "Screen" },
    ],
  },
  {
    id: "w6",
    title: "天使と悪魔の\nTODOリスト",
    image: "/img/Angel_Devil_Todo_hero.jpg",
    tag: "PRODUCT",
    period: "2025.4 ~ 5",
    client: "授業課題",
    role: "企画 / アプリ実装",
    overview:
      "作品の概要をここに書きます。\n狙い・工夫・結果などを2〜5段落で。",
    tech: ["Unity", "C#", "UI/UX"],
    links: [
      {
        label: "作品紹介ページ",
        href: "https://makezine.jp/event/makers-mft2025/m0128/",
      },
    ],
    gallery: [
      { src: "/img/AllVPlan_hero.png", alt: "Hero" },
      { src: "/works/2.png", alt: "Screen" },
    ],
  },
  {
    id: "w7",
    title: "全世界VTuber計画!?",
    image: "/img/AllVPlan_hero.png",
    tag: "GAME",
    period: "2025.1 ~ ",
    client: "個人制作",
    role: "企画 / UI / イラスト",
    overview: "",
    tech: ["Unity", "C#", "UI/UX"],
    links: [
      { label: "Demo", href: "https://example.com" },
      { label: "GitHub", href: "https://github.com/your/repo" },
    ],
    gallery: [
      { src: "/img/AllVPlan_hero.png", alt: "Hero" },
      { src: "/works/2.png", alt: "Screen" },
    ],
  },

  {
    id: "w8",
    title: "やってみよう！\nアートプログラミング",
    image: "/img/ADP.jpg",
    tag: "OTHER",
    period: "2025.4 ~ 2025.8",
    client: "授業課題",
    role: "企画 / 実装",
    overview: "",
    tech: ["Unity", "Python"],
    links: [
      {
        label: "つくばメディアアートフェスティバル2025",
        href: "https://www.tsukuba-artchannel.jp/page/page000181.html",
      },
      {
        label: "Qiita",
        href: "https://qiita.com/Kamuri96/items/9dcde71581e6d70166ec",
      },
    ],
    gallery: [
      { src: "/img/ADP.jpg", alt: "Hero" },
      { src: "/works/2.png", alt: "Screen" },
    ],
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
    "小さい頃から絵を描いたり、物を作ることがで好きです。",
    "近年は、分野にとらわれない「ものづくり」に取り組んでおり、ゲーム制作、イラスト、Web開発、映像、3Dモデル、金属加工など様々なものづくりに興味を持ち、勉強しています。",
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
