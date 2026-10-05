import "./footer.css";
import { Link } from "react-router-dom";
import { ArrowUp, Bug, Download, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiscordIcon } from "@/components/shared/DiscordIcon";
import { Translated } from "@/i18n/Translated";

const currentYear = new Date().getFullYear();
const links = [
  ["Servidor", "/server"],
  ["Rankings", "/stats"],
  ["Eventos", "/events"],
  ["Loja", "/shop"],
  ["Marketplace", "/marketplace"],
  ["Regras e políticas", "/rules"],
];
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link to="/" className="footer-brand" aria-label="Nightmare · início">
          <Shield fill="currentColor" className="size-8" />
          <span className="brand-font text-2xl">NIGHTMARE</span>
        </Link>
        <div className="footer-actions">
          <Button asChild variant="secondary">
            <Link to="/community">
              <DiscordIcon />
              <Translated text="Discord" />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/bugreport">
              <Bug />
              <Translated text="Reportar bug" />
            </Link>
          </Button>
          <Button asChild>
            <Link to="/download">
              <Download />
              <Translated text="Baixar" />
            </Link>
          </Button>
        </div>
      </div>
      <nav className="footer-links" aria-label="Rodapé">
        {links.map(([label, to]) => (
          <Link key={to} to={to}>
            <Translated text={label} />
          </Link>
        ))}
      </nav>
      <div className="footer-bottom">
        <div>
          <p>© {currentYear} Nightmare · MU Online</p>
          <p className="footer-notice">
            <Translated text="Protótipo independente · Todos os dados e pagamentos são simulados." />
          </p>
        </div>
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
    </footer>
  );
}
