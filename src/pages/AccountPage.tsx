import { Translated } from "@/i18n/Translated";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageHeading } from "@/components/shared/PageHeading";
import { AuthGate } from "@/components/shared/AuthGate";
import { VaultPanel } from "@/features/account/VaultPanel";
import { CharactersPanel } from "@/features/account/CharactersPanel";
import { PaymentsPanel } from "@/features/account/PaymentsPanel";
import { useGame } from "@/store/useGame";
export function AccountPage() {
  const { user, dispatch } = useGame();
  return (
    <div className="page">
      <AuthGate>
        {user && (
          <>
            <PageHeading
              eyebrow="Seu legado"
              title={"Olá, " + user.username + "."}
              description="Gerencie seus personagens, seu inventário e suas próximas conquistas."
              action={
                <Button
                  variant="secondary"
                  onClick={() => dispatch({ type: "session", username: null })}
                >
                  <Translated text="Sair" />
                </Button>
              }
            />
            <div className="mb-8 grid-cards">
              {[
                ["Nightmare Coins", user.coins + " NC"],
                [
                  "VIP",
                  user.vip +
                    (user.vipExpires
                      ? " · até " +
                        new Date(user.vipExpires).toLocaleDateString("pt-BR")
                      : ""),
                ],
                [
                  "Banco de joias",
                  Object.entries(user.jewels)
                    .slice(0, 3)
                    .map(([k, v]) => v + " " + k)
                    .join(" · "),
                ],
              ].map(([label, value]) => (
                <div key={label} className="panel">
                  <p className="eyebrow mb-3">
                    <Translated text={label} />
                  </p>
                  <p className="text-xl font-bold">
                    <Translated text={value} />
                  </p>
                </div>
              ))}
            </div>
            <details className="panel mb-8">
              <summary className="cursor-pointer font-bold">
                <Translated text="Banco de joias · todos os saldos" />
              </summary>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {Object.entries(user.jewels).map(([name, amount]) => (
                  <div className="data-row" key={name}>
                    <span>
                      <Translated text={name} />
                    </span>
                    <strong>
                      <Translated text={amount} />
                    </strong>
                  </div>
                ))}
              </div>
            </details>
            <Tabs defaultValue="vault">
              <TabsList className="mb-6 h-auto flex-wrap">
                <TabsTrigger value="vault">
                  <Translated text="Cofres" />
                </TabsTrigger>
                <TabsTrigger value="characters">
                  <Translated text="Personagens" />
                </TabsTrigger>
                <TabsTrigger value="payments">
                  <Translated text="Pagamentos" />
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Translated text="Segurança" />
                </TabsTrigger>
              </TabsList>
              <TabsContent value="vault">
                <VaultPanel />
              </TabsContent>
              <TabsContent value="characters">
                <CharactersPanel />
              </TabsContent>
              <TabsContent value="payments">
                <PaymentsPanel />
              </TabsContent>
              <TabsContent value="security">
                <div className="panel max-w-xl">
                  <h2 className="text-xl font-bold">
                    <Translated text="Sua conta" />
                  </h2>
                  <p className="muted my-4">
                    <Translated text={user.email} />
                    <Translated text="· PIN de segurança cadastrado" />
                  </p>
                  <Button asChild>
                    <Link to="/changepass">
                      <Translated text="Alterar senha" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </AuthGate>
    </div>
  );
}
