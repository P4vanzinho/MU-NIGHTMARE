import { Translated } from "@/i18n/Translated";
import { Link } from "react-router-dom";
import { PageHeading } from "@/components/shared/PageHeading";
import { Button } from "@/components/ui/button";
export function ServerPage() {
  return (
    <div className="page">
      <PageHeading
        eyebrow="MU Online · Season 6"
        title="Um mundo mais sombrio espera."
        description="Um servidor privado feito para quem quer mais. Evolua, encontre sua guilda e chegue ao topo."
        action={
          <Button asChild>
            <Link to="/download">
              <Translated text="Jogue agora" />
            </Link>
          </Button>
        }
      />
      <div className="grid-cards">
        {[
          ["Experiência", "×3"],
          ["Master XP", "×1,5"],
          ["Drop rate", "×3"],
          ["Nível máximo", "400"],
          ["Master máximo", "200"],
          ["Máximo de resets", "250"],
          ["Pontos por reset", "400"],
          ["Versão", "Season 6"],
        ].map(([title, value]) => (
          <div className="panel" key={title}>
            <p className="eyebrow mb-4">
              <Translated text={title} />
            </p>
            <p className="text-4xl font-bold">
              <Translated text={value} />
            </p>
          </div>
        ))}
      </div>
      <div className="section panel">
        <h2 className="text-2xl font-bold">
          <Translated text="O servidor está online" />
        </h2>
        <p className="muted mt-3">
          <Translated text="284 jogadores online (simulado). Explore personagens, eventos e um mercado entre jogadores." />
        </p>
      </div>
    </div>
  );
}
