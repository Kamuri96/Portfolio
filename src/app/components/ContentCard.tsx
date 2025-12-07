export type WorkCategory = "Game" | "Illustration" | "Product" | "Other";

export type Work = {
  title: string;
  category: WorkCategory;
  description: string;
  year?: string;
  link?: string;
};

type WorkCardProps = {
  work: Work;
};

export function ContentCard({ work }: WorkCardProps) {
  const { title, category, description, year, link } = work;

  return (
    <article className="work-card">
      <div className="ContentCard p-4">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4 text-center">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="work-card__meta">
              <span>{category}</span>
              {year && <span className="work-card__year"> / {year}</span>}
            </p>

            <p className="work-card__desc">{description}</p>

            {link && (
              <p className="work-card__link">
                <a href={link} target="_blank" rel="noreferrer">
                  詳しく見る →
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
