import { Translated } from "@/i18n/Translated";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useGame } from "@/store/useGame";
import { products } from "@/data/seed";
import { PageHeading } from "@/components/shared/PageHeading";
import { ItemArt } from "@/components/shared/ItemArt";
import { Checkout } from "@/components/shared/Checkout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
export function ShopPage() {
  const [params] = useSearchParams();
  const featured = params.get("product");
  const { user, state, dispatch } = useGame();
  const [checkout, setCheckout] = useState<string | null>(null);
  const [filter, setFilter] = useState("Tudo");
  function buy(product: (typeof products)[number]) {
    if (!user) {
      toast.error("Entre na sua conta para comprar.");
      return;
    }
    const id = crypto.randomUUID();
    dispatch({
      type: "order",
      order: {
        id,
        user: user.username,
        title: product.title,
        amount: product.price,
        coins: product.coins,
        vip: product.vip,
        status: "pending",
      },
    });
    setCheckout(id);
  }
  return (
    <div className="page">
      <PageHeading
        title="Prepare seu próximo capítulo."
        action={
          !user ? (
            <Button asChild>
              <Link to="/login?next=/shop">
                <Translated text="Entrar para comprar" />
              </Link>
            </Button>
          ) : (
            <Badge>
              <Translated text={user.coins} />
              <Translated text="NC" />
            </Badge>
          )
        }
      />
      <Tabs defaultValue="products">
        <TabsList className="mb-6">
          <TabsTrigger value="products">
            <Translated text="Loja" />
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Translated text="Minhas compras" />
          </TabsTrigger>
          <TabsTrigger value="services">
            <Translated text="Serviços e pacotes" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <div className="mb-6 flex gap-3">
            {["Tudo", "Moedas", "VIP"].map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "secondary"}
                onClick={() => setFilter(f)}
              >
                <Translated text={f} />
              </Button>
            ))}
          </div>
          <div className="grid-cards">
            {products
              .filter((p) => filter === "Tudo" || p.kind === filter)
              .map((p) => (
                <article
                  key={p.id}
                  className={
                    "panel " + (featured === p.id ? "ring-1 ring-primary" : "")
                  }
                >
                  <Badge variant="secondary">
                    <Translated text={p.tag} />
                  </Badge>
                  <ItemArt
                    category={p.kind === "VIP" ? "Armaduras" : "Joias"}
                  />
                  <h2 className="text-2xl font-bold">
                    <Translated text={p.title} />
                  </h2>
                  <p className="muted mt-2">
                    <Translated
                      text={
                        p.kind === "VIP"
                          ? "Benefícios por 30 dias. Recomprar o mesmo VIP soma ao prazo."
                          : "Entrega direta na sua conta."
                      }
                    />
                  </p>
                  <p className="my-5 text-3xl font-bold">
                    <Translated text="R$" />
                    {p.price.toFixed(2)}
                  </p>
                  <Button className="w-full" onClick={() => buy(p)}>
                    <Translated text="Comprar" />
                  </Button>
                </article>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="orders">
          <div className="panel">
            {state.orders
              .filter((o) => o.user === user?.username)
              .map((o) => (
                <div key={o.id} className="data-row">
                  <div>
                    <p className="font-bold">
                      <Translated text={o.title} />
                    </p>
                    <p className="muted">
                      <Translated text="R$" />
                      {o.amount.toFixed(2)} · <Translated text={o.status} />
                    </p>
                  </div>
                  {
                    <Button onClick={() => setCheckout(o.id)}>
                      <Translated text="Detalhes do pedido" />
                    </Button>
                  }
                </div>
              ))}
            {!state.orders.some((o) => o.user === user?.username) && (
              <p className="muted">
                <Translated text="Nenhum pedido ainda. Seus pedidos aparecem aqui." />
              </p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="services">
          <div className="grid-cards">
            <div className="panel">
              <h2 className="text-2xl font-bold">
                <Translated text="Seu personagem, do seu jeito" />
              </h2>
              <p className="muted my-4">
                <Translated text="Mude nome e classe por 200 NC. Controle a visibilidade das suas informações." />
              </p>
              <Button asChild>
                <Link to="/account">
                  <Translated text="Gerenciar personagens" />
                </Link>
              </Button>
            </div>
            <div className="panel">
              <h2 className="text-2xl font-bold">
                <Translated text="Pacote de joias" />
              </h2>
              <p className="muted my-4">
                <Translated text="20 Bless + 20 Soul · 300 NC" />
              </p>
              <Button
                onClick={() => {
                  if (!user) {
                    toast.error("Entre para comprar");
                    return;
                  }
                  if (user.coins < 300) {
                    toast.error("Saldo insuficiente");
                    return;
                  }
                  dispatch({
                    type: "user",
                    user: {
                      ...user,
                      coins: user.coins - 300,
                      jewels: {
                        ...user.jewels,
                        Bless: user.jewels.Bless + 20,
                        Soul: user.jewels.Soul + 20,
                      },
                    },
                  });
                  toast.success("Joias entregues ao banco!");
                }}
              >
                <Translated text="Comprar · 300 NC" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <Checkout id={checkout} onClose={() => setCheckout(null)} />
    </div>
  );
}
