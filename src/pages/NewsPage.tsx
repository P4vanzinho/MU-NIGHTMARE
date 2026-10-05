import { Translated } from "@/i18n/Translated";
import { useParams, Link } from "react-router-dom";
import { PageHeading } from "@/components/shared/PageHeading";
import { NewsCard } from "@/components/home/NewsCard";
import { news } from "@/data/seed";
import { Button } from "@/components/ui/button";
export function NewsPage() {
  const { slug } = useParams();
  return (
    <div className="page">
      <PageHeading
        title={slug ? "Season 6 está no ar." : "Um novo capítulo a cada dia."}
      />
      {slug ? (
        <article className="panel max-w-3xl">
          <p className="font-semibold mb-6">
            <Translated text="04 OUT 2026 · Atualização demo" />
          </p>
          <h2 className="text-3xl font-bold">
            <Translated text="Bem-vindo ao pesadelo" />
          </h2>
          <p className="muted my-6">
            <Translated text="A Season 6 reúne progressão por resets, eventos clássicos e negociações entre jogadores. Conheça o servidor, prepare seu personagem e participe da comunidade." />
          </p>
          <p className="muted mb-6">
            <Translated text="Experiência ×3, drop ×3, limite de 250 resets e 400 pontos por reset. Esta notícia é conteúdo demonstrativo." />
          </p>
          <Button asChild>
            <Link to="/download">
              <Translated text="Começar a jogar" />
            </Link>
          </Button>
        </article>
      ) : (
        <div className="grid-cards">
          {news.map((n) => (
            <NewsCard key={n.title} {...n} />
          ))}
        </div>
      )}
    </div>
  );
}
