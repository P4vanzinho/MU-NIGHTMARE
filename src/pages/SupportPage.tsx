import { Translated } from "@/i18n/Translated";
import { Link } from "react-router-dom";
import { PageHeading } from "@/components/shared/PageHeading";
import { Field } from "@/components/shared/Field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/shared/LocalizedInput";
import { Textarea } from "@/components/ui/textarea";
import { useGame } from "@/store/useGame";
import { toast } from "sonner";
export function SupportPage({ community = false }: { community?: boolean }) {
  const { state, user, dispatch } = useGame();
  if (community)
    return (
      <div className="page">
        <PageHeading title="Sua guilda começa aqui." />
        <div className="grid-cards">
          {[
            [
              "Comunidade Discord",
              "O convite oficial do site antigo ainda é um placeholder. A abertura é simulada.",
            ],
            [
              "Suporte e reportes",
              "Receba um protocolo local para acompanhar seu reporte.",
            ],
            [
              "Recompensas por bugs",
              "Falhas visuais, gameplay, crashes e exploits. A recompensa depende da validação da equipe.",
            ],
          ].map(([t, d]) => (
            <div key={t} className="panel">
              <h2 className="text-2xl font-bold">
                <Translated text={t} />
              </h2>
              <p className="muted my-4">
                <Translated text={d} />
              </p>
              {t === "Comunidade Discord" ? (
                <Button
                  onClick={() =>
                    toast.info(
                      "Entrada na comunidade simulada. Convite oficial pendente.",
                    )
                  }
                >
                  <Translated text="Entrar no Discord · demo" />
                </Button>
              ) : (
                <Button asChild>
                  <Link to="/bugreport">
                    <Translated text="Reportar problema" />
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div className="page">
      <PageHeading title="Encontrou algo estranho?" />
      <div className="grid gap-8 lg:grid-cols-2">
        <form
          className="panel form-stack"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const id = crypto.randomUUID();
            dispatch({
              type: "report",
              report: {
                id,
                user: user?.username || "visitante",
                title: String(data.get("title")),
                details: String(data.get("details")),
              },
            });
            toast.success("Reporte salvo. Protocolo " + id.slice(0, 8));
            e.currentTarget.reset();
          }}
        >
          <Field label="Título">
            <Input name="title" required minLength={5} />
          </Field>
          <Field label="Passos para reproduzir e impacto">
            <Textarea name="details" required minLength={15} rows={5} />
          </Field>
          <Button type="submit">
            <Translated text="Enviar reporte demo" />
          </Button>
         
        </form>
        <div className="panel">
          <h2 className="mb-4 text-2xl font-bold">
            <Translated text="Seus protocolos locais" />
          </h2>
          {state.reports.map((r) => (
            <div key={r.id} className="data-row">
              <div>
                <p className="font-bold">
                  <Translated text={r.title} />
                </p>
                <p className="muted text-xs">
                  {r.id.slice(0, 8)}
                  <Translated text="· Recebido (demo)" />
                </p>
              </div>
            </div>
          ))}
          {!state.reports.length && (
            <p className="muted">
              <Translated text="Nenhum reporte enviado." />
            </p>
          )}
          <p className="muted mt-6">
            <Translated text="Não abuse da falha. Reportes válidos podem receber recompensas após análise. Crítico, grave, médio e baixo são as categorias do site original." />
          </p>
        </div>
      </div>
    </div>
  );
}
