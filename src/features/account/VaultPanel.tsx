import { Translated } from "@/i18n/Translated";
import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ItemArt } from "@/components/shared/ItemArt";
import { Link } from "react-router-dom";
import { useGame } from "@/store/useGame";
export function VaultPanel() {
  const { user, dispatch } = useGame();
  const [location, setLocation] = useState<"game" | "site">("game");
  if (!user) return null;
  const items = user.items.filter((i) => i.location === location);
  return (
    <>
      <div className="mb-6 flex gap-3">
        <Button
          variant={location === "game" ? "default" : "secondary"}
          onClick={() => setLocation("game")}
        >
          <Translated text="Banco do jogo" />
        </Button>
        <Button
          variant={location === "site" ? "default" : "secondary"}
          onClick={() => setLocation("site")}
        >
          <Translated text="Banco do site" />
        </Button>
      </div>
      <p className="muted mb-6">
        <Translated text="Compras chegam ao banco do site. Transfira para o jogo para usar, ou anuncie no mercado." />
      </p>
      <div className="grid-cards">
        {items.map((item) => (
          <div key={item.id} className="panel">
            <ItemArt category={item.category} />
            <h3 className="text-xl font-bold">
              <Translated text={item.name} /> +<Translated text={item.level} />
            </h3>
            <p className="muted mb-4">
              <Translated text={item.excellent ? "Excellent · " : ""} />
              <Translated text={item.category} />
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                dispatch({
                  type: "user",
                  user: {
                    ...user,
                    items: user.items.map((i) =>
                      i.id === item.id
                        ? {
                            ...i,
                            location: location === "game" ? "site" : "game",
                          }
                        : i,
                    ),
                  },
                });
                toast.success("Item transferido.");
              }}
            >
              <ArrowRightLeft />
              <Translated text="Transferir para" />
              <Translated text={location === "game" ? "site" : "jogo"} />
            </Button>
            {location === "site" && (
              <Button asChild variant="ghost" className="mt-3">
                <Link to="/marketplace?tab=create">
                  <Translated text="Vender no mercado" />
                </Link>
              </Button>
            )}
          </div>
        ))}
      </div>
      {!items.length && (
        <p className="panel muted">
          <Translated text="Este cofre está vazio. Transfira itens do outro banco ou compre no mercado." />
        </p>
      )}
    </>
  );
}
