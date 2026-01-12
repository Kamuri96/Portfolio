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
  pubDate: string;
  platform: "Qiita" | "Zenn" | "note";
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
  experience: string;
  description: string;
};

export const works: WorkItem[] = [
  {
    id: "w1",
    title: "いっぱい食べる\nキミが好き！",
    image: "/img/IppaiTaberu/4.png",
    tag: "GAME",
    period: "2022.6 ~ 2022.7",
    client: "個人制作",
    role: "企画 / 実装 / UIデザイン",
    overview:
      "初めての個人制作ゲームです。\n 時間内にフィールド内のアイテムを拾い、スコアを集める3Dゲームです。\n ゲーム内のUIを全て手描きで制作し、ゲームの世界観を統一しました。",
    tech: ["Unity", "C#", "IbisPaint"],
    links: [
      { label: "Unityroom", href: "https://unityroom.com/games/ippai_taberu" },
      { label: "GitHub", href: "https://github.com/Kamuri96/OriginalGame" },
    ],
    gallery: [
      { src: "/img/IppaiTaberu/4.png", alt: "紹介ページ1" },
      { src: "/img/IppaiTaberu/5.png", alt: "紹介ページ2" },
      { src: "/img/IppaiTaberu/6.png", alt: "紹介ページ3" },
    ],
  },
  {
    id: "w2",
    title: "Colorful Umiushi!",
    image: "/img/Umiushi/7.png",
    tag: "GAME",
    period: "2023.2 ~ 2023.3",
    client: "個人制作",
    role: "企画 / 実装 / UIデザイン",
    overview:
      "色の混ぜ合わせや補色などの、色の性質を用いたパズルゲームです。\n 背景やプレイヤー、ゲーム内オブジェクトのドット絵を全て手描きし、世界観を統一しました。\n ステージが進むにつれ、色の数や見える範囲を変化させるなど、レベルデザインに注意を払いました。",
    tech: ["Unity", "C#", "IbisPaint"],
    links: [
      {
        label: "Unityroom",
        href: "https://unityroom.com/games/colorful-umiushi",
      },
      { label: "GitHub", href: "https://github.com/Kamuri96/LA_Original" },
    ],
    gallery: [
      { src: "/img/Umiushi/7.png", alt: "紹介ページ1" },
      { src: "/img/Umiushi/8.png", alt: "紹介ページ2" },
      { src: "/img/Umiushi/9.png", alt: "紹介ページ3" },
    ],
  },
  {
    id: "w3",
    title: "バトム！",
    image: "/img/battm/BattmLogo.png",
    tag: "GAME",
    period: "2023.7",
    client: "個人制作",
    role: "企画 / アニメーション実装 / UIデザイン",
    overview:
      "技育CAMPハッカソンで制作した作品です。\n 学生が実験のように手を動かしながら、ゲーム感覚で化学を勉強できるゲームというコンセプトで制作しました。\n マッチング時やリザルト表示にアニメーションをつけたり、分子のオブジェクトをふわふわ動かしたりなど、常に画面に飽きのこないデザインを心がけました。",
    tech: ["Unity", "C#", "PhotoShop", "ClipStudioPaint"],
    links: [
      {
        label: "Unityroom",
        href: "https://unityroom.com/games/batomu",
      },
    ],
    gallery: [
      { src: "/img/battm/10.png", alt: "紹介ページ1" },
      { src: "/img/battm/11.png", alt: "紹介ページ2" },
      { src: "/img/battm/12.png", alt: "紹介ページ3" },
      { src: "/img/battm/13.png", alt: "紹介ページ4" },
    ],
  },
  {
    id: "w4",
    title: "Cocoiko",
    image: "/img/cocoiko/cocoikoLogo.png",
    tag: "WEB",
    period: "2024.6",
    client: "個人制作",
    role: "企画 / 実装",
    overview:
      "技育CAMPハッカソンで制作した作品です。\n 全員がWebアプリケーション初心者の中、普段自分たちが出かける際の悩みを解決するアプリケーションを制作しました。\n 行きたいところ選びから日程調整まで一つのアプリで簡潔する便利さと、思わず使いたくなる可愛らしいデザインを心がけました。",
    tech: ["HTML", "CSS", "JavaScript", "React", "FireBase"],
    gallery: [
      { src: "/img/cocoiko/cocoiko1.png", alt: "Topページ" },
      {
        src: "/img/cocoiko/cocoiko2.png",
        alt: "行きたいところを追加するページ",
      },
      { src: "/img/cocoiko/cocoiko3.png", alt: "カレンダーページ" },
    ],
  },
  {
    id: "w5",
    title: "マドライズ",
    image: "/img/Madlize/Madlize.png",
    tag: "GAME",
    period: "2025",
    client: "個人制作",
    role: "企画 / アニメーション実装 / UIデザイン",
    overview:
      "HackUで制作した作品です。\n 二人で遊ぶ体験型の作品で、画面上で手の形に応じた魔法が自身の手から放たれ、その魔法を用いて敵を倒していきます。\n  HackUでは参加者投票1位のHappy Hacking賞をいただきました。",
    tech: ["Unity", "C#", "MediaPipe", "Photoshop"],
    gallery: [
      { src: "/img/Madlize/MadlizeLogo.png", alt: "ロゴ" },
      { src: "/img/Madlize/MadlizePlay.png", alt: "プレイの様子" },
      { src: "/img/Madlize/Madla.png", alt: "魔法一覧" },
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
      "大学院のプロジェクトで制作した作品です。\n ウェブアプリケーション上で登録したタスクの進行度に合わせ、肩に装着する天使と悪魔のデバイスが視覚や触覚でフィードバックする、新しいタスク管理の形として制作しました。",
    tech: ["Arduino", "C++", "TypeScript", "React"],
    links: [
      {
        label: "作品紹介ページ",
        href: "https://makezine.jp/event/makers-mft2025/m0128/",
      },
    ],
    gallery: [
      { src: "/img/Angel_Devil/AD1.JPG", alt: "プロダクト写真" },
      { src: "/img/Angel_Devil/AD2.JPG", alt: "着用イメージ" },
      {
        src: "/img/Angel_Devil/AD3.JPG",
        alt: "Maker Faire Tokyoでの展示の様子",
      },
      {
        src: "/img/Angel_Devil/AD4.JPG",
        alt: "Maker Faire Tokyoでの展示の様子",
      },
    ],
  },
  {
    id: "w7",
    title: "全世界VTuber計画!?",
    image: "/img/AllVPlan_hero.png",
    tag: "GAME",
    period: "2025.1 ~ ",
    client: "個人制作",
    role: "企画 / UIデザイン / イラスト / グッズ制作",
    overview:
      "東京ゲームダンジョンに継続的に出展している作品です。\n VTuberの女の子と共にさまざまなミニゲームをクリアし、一緒に世界を救おう!という世界観のゲームです。\n 出展に伴い、ゲーム開発だけでなくSNSでの広報やグッズ制作などにも注力しています。",
    tech: ["Unity", "C#", "PhotoShop", "ClipStudioPaint"],
    links: [
      { label: "X", href: "https://x.com/technya_studio" },
      {
        label: "東京ゲームダンジョン",
        href: "https://tokyogamedungeon.com/",
      },
    ],
    gallery: [
      { src: "/img/AllVPlan/AllVPlan_hero.png", alt: "メインビジュアル" },
      { src: "/img/AllVPlan/AllVPlanAnim.gif", alt: "アニメーション" },
      { src: "/img/AllVPlan/AllVPlanSD.png", alt: "SDイラスト" },
      { src: "/img/AllVPlan/AllVPlanTalk.png", alt: "缶バッチイラスト" },
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
    overview:
      "授業のプロジェクトの一環で、つくば市のイベントで行ったワークショップです。\n 美術館に来た子どもたちに、自分の作品を作ることとプログラミングを身近に感じてもらうことを目的に、企画、実装、運営を行いました。\n ワークショップの成果はデザイン学会秋季大会の学生プロポジションでポスター発表し、優秀賞をいただきました。",
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
      { src: "/img/ADP/ADP.jpg", alt: "展示の様子" },
      { src: "/img/ADP/ADP2.jpg", alt: "ワークショップの様子" },
    ],
  },
];

export const profile: Profile = {
  name: "中村 美月",
  title: "Engineer / Designer",
  bio: "かわいいと遊びの体験を追求するクリエイター",
  about: [
    "小さい頃から絵を描いたり、物を作ることがで好きです。",
    "分野にとらわれない「ものづくり」にを目標に、ゲーム制作、イラスト、Web開発、映像、3Dモデル、金属加工など様々なものづくりに興味を持ち、日々制作に取り組んでいます。",
  ],
  experiences: [
    {
      period: "2024.11",
      headline: "Open Hack U 2024 TOKYO vol.3",
      detail: "Happy Hacking賞",
    },
    {
      period: "2025.7",
      headline: "株式会社スタンバイ 4daysサマーインターン",
      detail: "最優秀賞",
    },
    {
      period: "2025.8",
      headline: "株式会社いい生活 5daysサマーインターン",
    },
    {
      period: "2025.8",
      headline: "株式会社サイバーエージェント プロトスプリントリーグ",
    },
    {
      period: "2025.9",
      headline: "Visional Internship 2025 「SOLVE」",
    },
    {
      period: "2025.11",
      headline: "デザイン学会秋季大会 学生プロポジション",
      detail: "優秀賞",
    },
  ],
};

export const skillItems: SkillItem[] = [
  {
    name: "Unity",
    experience: "2022~",
    description: "個人/チームでのゲーム制作、指導の経験",
  },
  {
    name: "Ruby",
    experience: "2025~",
    description: "Ruby on Railsでの就業型インターン経験",
  },
  {
    name: "Next.js / React",
    experience: "2024~",
    description: "Webサイト制作",
  },
  {
    name: "Figma",
    experience: "2024~",
    description: "ワイヤー、UI設計",
  },
  {
    name: "Photoshop",
    experience: "2023~",
    description: "UI制作、ポスターデザイン、グッズデザインなど",
  },
  {
    name: "ClipStudioPaint",
    experience: "2023~",
    description: "イラスト制作、ロゴ制作、UI制作など",
  },
];
