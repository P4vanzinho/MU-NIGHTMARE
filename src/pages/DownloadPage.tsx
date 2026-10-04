import { Translated } from "@/i18n/Translated";
import { downloadText } from "@/lib/download";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/shared/PageHeading";
import { toast } from "sonner";
export function DownloadPage() {
  return (
    <div className="page">
      <PageHeading
        eyebrow="Seu próximo capítulo"
        title="Tudo pronto para jogar."
        description="Neste protótipo o download é simulado; nenhum executável será baixado."
      />
      <div className="grid-cards">
        {[
          [
            "01",
            "Crie sua conta",
            "Seu login funciona no site e no jogo.",
            "/register",
          ],
          [
            "02",
            "Prepare o cliente",
            "Windows · Season 6 · 1,2 GB (demo).",
            "",
          ],
          [
            "03",
            "Encontre sua comunidade",
            "Descubra guildas, eventos e suporte.",
            "/community",
          ],
        ].map(([number, title, desc, to]) => (
          <div key={number} className="panel">
            <p className="mb-6 text-4xl font-bold text-primary">
              <Translated text={number} />
            </p>
            <h2 className="text-2xl font-bold">
              <Translated text={title} />
            </h2>
            <p className="muted my-4">
              <Translated text={desc} />
            </p>
            {to ? (
              <Button asChild>
                <Link to={to}>
                  <Translated text="Continuar" />
                </Link>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  downloadText(
                    "nightmare-download-demo.txt",
                    "NIGHTMARE PROTOTYPE\nDownload simulado. Este arquivo não contém o jogo.",
                  );
                  toast.success("Download demonstrativo iniciado.");
                }}
              >
                <Translated text="Baixar cliente demo" />
              </Button>
            )}
          </div>
        ))}
      </div>
      <div className="section panel">
        <h2 className="text-xl font-bold">
          <Translated text="Requisitos e instalação" />
        </h2>
        <p className="muted mt-3">
          <Translated text="Windows 10 ou superior · 4 GB RAM · 2 GB disponíveis. Requisitos ilustrativos para testar o fluxo." />
        </p>
        <p className="muted mt-3">
          <Translated text="O cliente original está referenciado na amostra; a distribuição real será configurada na integração." />
        </p>
      </div>
    </div>
  );
}
