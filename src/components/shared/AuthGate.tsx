import { Translated } from "@/i18n/Translated";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGame } from "@/store/useGame";
export function AuthGate({ children }: { children: ReactNode }) {
  const { user } = useGame();
  const location = useLocation();
  return user ? (
    children
  ) : (
    <div className="panel mx-auto my-12 max-w-lg text-center">
      <h2 className="text-2xl font-bold">
        <Translated text="Seu próximo capítulo começa aqui" />
      </h2>
      <p className="muted my-4">
        <Translated text="Entre para acessar este recurso. Use demo / Nightmare123 para explorar." />
      </p>
      <Button asChild>
        <Link to={"/login?next=" + encodeURIComponent(location.pathname)}>
          <Translated text="Entrar na conta" />
        </Link>
      </Button>
    </div>
  );
}
