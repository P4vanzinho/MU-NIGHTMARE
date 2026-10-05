import { NavGroup } from "./NavGroup";
import { DiscordIcon } from "@/components/shared/DiscordIcon";
import { ServerStatusBar } from "./ServerStatusBar";
import { useContext } from "react";
import { Globe } from "lucide-react";
import { LocaleContext } from "@/i18n/context";
import { Translated } from "@/i18n/Translated";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Shield, Search, Menu, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/shared/LocalizedInput";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGame } from "@/store/useGame";
const links = [
  ["Rankings", "/stats"],
  ["Eventos", "/events"],
  ["Reportar bug", "/bugreport"],
];
const shopLinks = [
  ["Nightmare Shop", "/shop"],
  ["Marketplace", "/marketplace"],
  ["Doação", "/donation"],
];
export function Header() {
  const { locale, setLocale } = useContext(LocaleContext);
  const { user, dispatch } = useGame();
  const navigate = useNavigate();
  return (
    <header className="site-chrome">
      <div className="site-header">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-[var(--brand-icon-gap)]"
        >
          <Shield
            fill="white"
            className="size-[var(--brand-icon-size)] text-background"
          />
          <strong className="brand-font text-xl tracking-wide text-white">
            <Translated text="NIGHTMARE" />
          </strong>
        </Link>
        <nav className="desktop-nav" aria-label="Principal">
          {links.slice(0, 2).map(([title, to]) => (
            <NavLink className="nav-link" key={to} to={to}>
              <Translated text={title} />
            </NavLink>
          ))}
          <NavGroup label="Loja" links={shopLinks} />
          <NavLink className="nav-link" to="/bugreport">
            <Translated text="Reportar bug" />
          </NavLink>
        </nav>
        <form
          className="header-search"
          onSubmit={(e) => {
            e.preventDefault();
            const q = new FormData(e.currentTarget).get("q");
            navigate("/search?q=" + encodeURIComponent(String(q)));
          }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 muted" />
            <Input
              name="q"
              placeholder="Procurar"
              aria-label="Procurar"
              className="rounded-full pl-9"
            />
          </div>
        </form>
        <div className="header-account hide-mobile">
          {user ? (
            <NavGroup
              label={user.username}
              links={[
                ["Minha conta", "/account"],
                ["Alterar senha", "/changepass"],
              ]}
              onLogout={() => dispatch({ type: "session", username: null })}
            />
          ) : (
            <Button asChild variant="ghost" className="header-text-button">
              <Link to="/login">
                <Translated text="Entrar" />
              </Link>
            </Button>
          )}
        </div>
        <Button asChild>
          <Link to="/download">
            <Translated text="Baixar" />
            <Download className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="header-discord header-text-button"
          aria-label="Discord"
        >
          <Link to="/community" title="Discord">
            <DiscordIcon />
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="header-language header-text-button"
          aria-label="Idioma / Language"
          title={locale === "pt" ? "Switch to English" : "Mudar para português"}
          onClick={() => setLocale(locale === "pt" ? "en" : "pt")}
        >
          <Globe className="h-4 w-4" />
          <span>{locale.toUpperCase()}</span>
        </Button>
        <div className="mobile-menu ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menu">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="max-h-[75vh] overflow-auto"
            >
              {[
                ...links,
                ...shopLinks,
                ...(user
                  ? [
                      ["Minha conta", "/account"],
                      ["Alterar senha", "/changepass"],
                    ]
                  : [["Entrar", "/login"]]),
                ["Comunidade Discord", "/community"],
              ].map(([label, to]) => (
                <DropdownMenuItem asChild key={to}>
                  <Link to={to}>
                    <Translated text={label} />
                  </Link>
                </DropdownMenuItem>
              ))}
              {user && (
                <DropdownMenuItem
                  onClick={() => dispatch({ type: "session", username: null })}
                >
                  <Translated text="Sair" />
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <ServerStatusBar />
    </header>
  );
}
