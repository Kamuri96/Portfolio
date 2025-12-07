import { ContentCard, Work } from "./ContentCard";

const works: Work[] = [
  {
    title: "お絵かき花火ワークショップ",
    category: "Game",
    description:
      "子供の描いたイラストを花火として打ち上げる体験型ワークショップ。",
    year: "2024",
    // link: "https://example.com/fireworks",
  },
  {
    title: "ポートフォリオサイト",
    category: "Product",
    description: "Next.js + TypeScriptで制作中の個人ポートフォリオサイト。",
    year: "2025",
  },
  {
    title: "RootReal Web Design",
    category: "Product",
    description:
      "アイドルプロジェクトのコンセプトサイト。Next.js + Tailwindで実装。",
  },
  {
    title: "キャラクターイラスト集",
    category: "Illustration",
    description: "世界観設定用に描いたキャラクターイラストのシリーズ。",
  },
];

export function WorksSection() {
  return (
    <section id="works" className="section">
      <div className="section__inner">
        <h2 className="text-blue-700 p-4">Work</h2>

        <div className="works-grid">
          {works.map((work) => (
            <ContentCard key={work.title} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
}
