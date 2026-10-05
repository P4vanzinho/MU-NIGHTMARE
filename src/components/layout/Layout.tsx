import { Translated } from "@/i18n/Translated";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./Header";
export function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title =
      "Nightmare · " + (pathname === "/" ? "Season 6" : pathname.slice(1));
  }, [pathname]);
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="site-footer border-t border-border">
        <div className="flex flex-wrap justify-between gap-8">
          <div>
            <Link to="/" className="brand-font text-2xl">
              <Translated text="NIGHTMARE" />
            </Link>
            <p className="muted mt-2 text-sm">
              <Translated text="Seu próximo capítulo é um pesadelo." />
            </p>
            <p className="muted mt-2 text-xs">
              <Translated text="Protótipo independente · Todos os dados e pagamentos são simulados." />
            </p>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm" aria-label="Rodapé">
            {[
              ["Servidor", "/server"],
              ["Comunidade", "/community"],
              ["Regras e políticas", "/rules"],
              ["Suporte", "/bugreport"],
              ["Componentes", "/components"],
            ].map(([label, to]) => (
              <Link key={to} to={to}>
                <Translated text={label} />
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
