import { Translated } from "@/i18n/Translated";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageHeading } from "@/components/shared/PageHeading";
const sections = [
  {
    id: "rules",
    title: "Regras do servidor",
    items: [
      "Respeite jogadores e equipe. Assédio e discriminação não são tolerados.",
      "Não utilize cheats, automações ou exploits.",
      "Reporte falhas sem explorá-las. Evite duplicação e abuso de itens.",
      "Negocie pelo mercado e preserve a segurança da sua conta.",
    ],
  },
  {
    id: "refund",
    title: "Reembolso",
    items: [
      "Política demonstrativa para revisão. Nenhuma cobrança real ocorre neste protótipo.",
      "Problemas de entrega podem ser reportados ao suporte com o número do pedido.",
    ],
  },
  {
    id: "privacy",
    title: "Privacidade",
    items: [
      "Dados deste protótipo ficam no armazenamento local do navegador.",
      "Use apenas informações fictícias. Não há backend nem envio de formulários a terceiros.",
      "Para apagar a demonstração, limpe os dados locais deste site.",
    ],
  },
  {
    id: "terms",
    title: "Termos",
    items: [
      "Este protótipo é uma demonstração de navegação e fluxos, sem serviços comerciais ativos.",
      "As políticas completas do site original precisam de revisão antes de publicação.",
    ],
  },
  {
    id: "contact",
    title: "Contatos",
    items: [
      "Comunidade e suporte: fluxo demonstrativo na página Comunidade.",
      "Reporte um problema pela página Reportar bug e acompanhe seu protocolo local.",
    ],
  },
];
export function RulesPage() {
  return (
    <div className="page">
      <PageHeading title="Regras e políticas." />
      <Tabs defaultValue="rules">
        <TabsList className="mb-6 h-auto flex-wrap">
          {sections.map((s) => (
            <TabsTrigger key={s.id} value={s.id}>
              <Translated text={s.title} />
            </TabsTrigger>
          ))}
        </TabsList>
        {sections.map((s) => (
          <TabsContent value={s.id} key={s.id}>
            <article className="panel max-w-3xl">
              <h2 className="mb-6 text-2xl font-bold">
                <Translated text={s.title} />
              </h2>
              {s.items.map((text, i) => (
                <p className="data-row" key={text}>
                  <span className="text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 muted">
                    <Translated text={text} />
                  </span>
                </p>
              ))}
            </article>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
