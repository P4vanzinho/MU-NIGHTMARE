import { useContext } from "react";
import { Globe } from "lucide-react";
import { LocaleContext } from "@/i18n/context";
import { Translated } from "@/i18n/Translated";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Shield, Search, Menu, ChevronDown, Download } from "lucide-react";
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
  ["Servidor", "/server"],
  ["Rankings", "/stats"],
  ["Eventos", "/events"],
  ["Novidades", "/news"],
];
const groups = [
  {
    label: "Conta",
    links: [
      ["Minha conta", "/account"],
      ["Entrar", "/login"],
      ["Criar conta", "/register"],
      ["Alterar senha", "/changepass"],
    ],
  },
  {
    label: "Loja",
    links: [
      ["Nightmare Shop", "/shop"],
      ["Marketplace", "/marketplace"],
      ["Doação", "/donation"],
    ],
  },
  {
    label: "Mais",
    links: [
      ["Regras e políticas", "/rules"],
      ["Reportar bug", "/bugreport"],
      ["Comunidade", "/community"],
      ["Catálogo de componentes", "/components"],
    ],
  },
];
export function Header() {
  const { locale, setLocale } = useContext(LocaleContext);
  const { user, dispatch } = useGame();
  const navigate = useNavigate();
  return (
    <header className="site-header">
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
        {links.slice(0, 3).map(([title, to]) => (
          <NavLink className="nav-link" key={to} to={to}>
            <Translated text={title} />
          </NavLink>
        ))}
        {groups.slice(0, 2).map((group) => (
          <NavGroup key={group.label} {...group} />
        ))}
        <NavLink to="/news">
          <Translated text="Novidades" />
        </NavLink>
        <NavGroup {...groups[2]} />
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
      <Button
        asChild
        variant="ghost"
        className="hide-mobile header-text-button"
      >
        <Link to={user ? "/account" : "/login"}>
          <Translated text={user ? user.username : "Entrar"} />
        </Link>
      </Button>
      <Button
        asChild
        variant="secondary"
        className="hide-mobile header-text-button"
      >
        <Link to="/shop">
          <Translated text="Loja" />
        </Link>
      </Button>
      <Button asChild>
        <Link to="/download">
          <Translated text="Baixar" />
          <Download className="h-4 w-4" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Idioma / Language"
        title={locale === "pt" ? "Switch to English" : "Mudar para português"}
        onClick={() => setLocale(locale === "pt" ? "en" : "pt")}
      >
        <Globe className="h-4 w-4" />
        <span className="text-[10px]">{locale.toUpperCase()}</span>
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
            {[...links, ...groups.flatMap((g) => g.links)].map(
              ([label, to]) => (
                <DropdownMenuItem asChild key={to}>
                  <Link to={to}>
                    <Translated text={label} />
                  </Link>
                </DropdownMenuItem>
              ),
            )}
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
    </header>
  );
}
function NavGroup({ label, links }: { label: string; links: string[][] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1">
        <Translated text={label} />
        <ChevronDown className="h-3 w-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {links.map(([title, to]) => (
          <DropdownMenuItem asChild key={to}>
            <Link to={to}>
              <Translated text={title} />
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
