import { Translated } from "@/i18n/Translated";
import { Link, useSearchParams } from "react-router-dom";
import { PageHeading } from "@/components/shared/PageHeading";
import { news } from "@/data/seed";
import { useGame } from "@/store/useGame";
const pages = [
  ["Servidor", "/server"],
  ["Rankings", "/stats"],
  ["Eventos", "/events"],
  ["Conta", "/account"],
  ["Loja", "/shop"],
  ["Marketplace", "/marketplace"],
  ["Regras", "/rules"],
  ["Doação", "/donation"],
  ["Suporte", "/bugreport"],
];
export function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const { state } = useGame();
  const results = [
    ...pages,
    ...news.map((n) => [n.title, n.to]),
    ...state.listings.map((l) => [l.item.name, "/marketplace"]),
  ].filter(([label]) => label.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="page">
      <PageHeading
        eyebrow="Explore o pesadelo"
        title={"Resultados para “" + query + "”"}
        description={results.length + " resultados encontrados"}
      />
      <div className="panel">
        {results.map(([label, to], i) => (
          <Link className="data-row" key={i} to={to}>
            <Translated text={label} />
            <span>→</span>
          </Link>
        ))}
        {!results.length && (
          <p className="muted">
            <Translated text="Nenhum resultado. Tente “loja”, “eventos” ou “sword”." />
          </p>
        )}
      </div>
    </div>
  );
}
