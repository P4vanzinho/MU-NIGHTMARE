import "./footer.css";
import { Link } from "react-router-dom";
import { ArrowUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiscordIcon } from "@/components/shared/DiscordIcon";
import { Translated } from "@/i18n/Translated";

const currentYear = new Date().getFullYear();
const groups = [
  {
    title: "Jogo",
    links: [
      ["Servidor", "/server"],
      ["Rankings", "/stats"],
      ["Eventos", "/events"],
      ["Loja", "/shop"],
      ["Marketplace", "/marketplace"],
      ["Baixar", "/download"],
    ],
  },
  {
    title: "Comunidade",
    links: [
      ["Discord", "/community"],
      ["Reportar bug", "/bugreport"],
    ],
  },
];
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link to="/" className="footer-brand" aria-label="Nightmare · início">
          <Shield className="size-8" />
          <span className="brand-font">NIGHTMARE</span>
        </Link>
        <div className="footer-social">
          <Button asChild variant="ghost" size="icon">
            <Link to="/community" aria-label="Comunidade Discord">
              <DiscordIcon />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Voltar ao topo"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            <ArrowUp />
          </Button>
        </div>
      </div>
      <nav className="footer-navigation" aria-label="Rodapé">
        {groups.map((group) => (
          <div key={group.title} className="footer-group">
            <h2>
              <Translated text={group.title} />
            </h2>
            <ul>
              {group.links.map(([label, to]) => (
                <li key={to}>
                  <Link to={to}>
                    <Translated text={label} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="footer-bottom">
        <div className="footer-notice">
          <p>© {currentYear} Nightmare · MU Online</p>
          <p>
            <Translated text="Protótipo independente · Todos os dados e pagamentos são simulados." />
          </p>
          <p>
            <Translated text="MU Online e suas imagens pertencem à Webzen e aos respectivos titulares." />
          </p>
        </div>
        <Link to="/rules">
          <Translated text="Regras e políticas" />
        </Link>
      </div>
    </footer>
  );
}
