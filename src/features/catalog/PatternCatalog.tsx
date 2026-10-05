import { NewsConveyor } from "@/components/home/NewsConveyor";
import { ServerStatusBar } from "@/components/layout/ServerStatusBar";
import { Translated } from "@/i18n/Translated";
import { NewsCard } from "@/components/home/NewsCard";
import { ListingCard } from "@/features/market/ListingCard";
import { PageHeading } from "@/components/shared/PageHeading";
import { Field } from "@/components/shared/Field";
import { Input } from "@/components/shared/LocalizedInput";
import { seed, news } from "@/data/seed";
import { toast } from "sonner";
export function PatternCatalog({ onDialog }: { onDialog: () => void }) {
  return (
    <div className="grid-cards">
      <div className="col-span-full">
        <NewsConveyor />
      </div>
      <div className="col-span-full overflow-hidden rounded-lg border border-border">
        <ServerStatusBar />
      </div>
      <div>
        <NewsCard {...news[0]} />
        <p className="muted mt-4">
          <Translated text="NewsCard · notícias e agenda" />
        </p>
      </div>
      <div>
        <ListingCard
          listing={seed.listings[0]}
          onBuy={() => onDialog()}
          onOffer={() => toast.info("Oferta de exemplo")}
        />
        <p className="muted mt-4">
          <Translated text="ListingCard + ItemArt · catálogo de itens" />
        </p>
      </div>
      <div className="panel">
        <PageHeading title="Hierarquia clara." />
        <Field label="Field">
          <Input placeholder="Label + controle" />
        </Field>
        <p className="muted mt-6">
          <Translated text="Padrões: AuthGate, Checkout, VaultPanel, CharactersPanel, PaymentsPanel, Hero, Header e Layout." />
        </p>
      </div>
    </div>
  );
}
