import { Translated } from "@/i18n/Translated";
import { AdvancedFilters } from "@/features/market/AdvancedFilters";
import type { AdvancedFilters as Filters } from "@/types/filters";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/shared/LocalizedInput";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/shared/Field";
import { PageHeading } from "@/components/shared/PageHeading";
import { ListingCard } from "@/features/market/ListingCard";
import { CreateListing } from "@/features/market/CreateListing";
import { MarketDialog } from "@/features/market/MarketDialog";
import { MarketActivity } from "@/features/market/MarketActivity";
import { useGame } from "@/store/useGame";
export function MarketplacePage() {
  const { state } = useGame();
  const [params] = useSearchParams();
  const [advanced, setAdvanced] = useState<Filters>({
    luck: false,
    skill: false,
    ancient: false,
    socket: false,
    offers: false,
    excellentOptions: [],
  });
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [currency, setCurrency] = useState("Todas");
  const [seller, setSeller] = useState("");
  const [sort, setSort] = useState("recent");
  const [level, setLevel] = useState(0);
  const [max, setMax] = useState(100000);
  const [excellent, setExcellent] = useState(false);
  const [page, setPage] = useState(0);
  const [selection, setSelection] = useState<{
    id: string;
    offer: boolean;
  } | null>(null);
  const filtered = state.listings.filter(
    (l) =>
      !state.orders.some(
        (o) => o.listing?.id === l.id && o.status === "pending",
      ) &&
      l.item.name.toLowerCase().includes(query.toLowerCase()) &&
      l.seller.toLowerCase().includes(seller.toLowerCase()) &&
      (category === "Todas" || l.item.category === category) &&
      (currency === "Todas" || l.currency === currency) &&
      l.item.level >= level &&
      l.price <= max &&
      (!excellent || l.item.excellent) &&
      (!advanced.luck || l.item.luck) &&
      (!advanced.skill || l.item.skill) &&
      (!advanced.ancient || l.item.ancient) &&
      (!advanced.socket || l.item.socket) &&
      (!advanced.offers || l.acceptsOffers) &&
      advanced.excellentOptions.every((n) => l.item.excOptions?.includes(n)),
  );
  const listings = [...filtered].sort((a, b) =>
    sort === "asc"
      ? a.price - b.price
      : sort === "desc"
        ? b.price - a.price
        : 0,
  );
  return (
    <div className="page">
      <PageHeading
        eyebrow="De jogador para jogador"
        title="Marketplace"
        description="Encontre seu próximo item. Negocie com a comunidade. Faça sua oferta."
      />
      <Tabs defaultValue={params.get("tab") || "browse"}>
        <TabsList className="mb-6 h-auto flex-wrap">
          {[
            ["browse", "Explorar"],
            ["mine", "Meus anúncios"],
            ["create", "Criar anúncio"],
            ["offers", "Ofertas"],
            ["transactions", "Transações"],
          ].map(([v, t]) => (
            <TabsTrigger key={v} value={v}>
              <Translated text={t} />
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="browse">
          <div className="panel mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Buscar item">
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(0);
                }}
                placeholder="Nome do item"
              />
            </Field>
            <Field label="Categoria">
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(0);
                }}
              >
                {[
                  "Todas",
                  "Armas",
                  "Armaduras",
                  "Asas",
                  "Capas",
                  "Pets",
                  "Consumíveis",
                  "Joias",
                  "Pergaminhos",
                ].map((c) => (
                  <option key={c}>
                    <Translated text={c} />
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Moeda">
              <select
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value);
                  setPage(0);
                }}
              >
                {["Todas", "NC", "Bless", "Soul", "Jewels", "BRL"].map((c) => (
                  <option key={c}>
                    <Translated text={c} />
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Ordenação">
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="recent">
                  <Translated text="Mais recentes" />
                </option>
                <option value="asc">
                  <Translated text="Menor preço" />
                </option>
                <option value="desc">
                  <Translated text="Maior preço" />
                </option>
              </select>
            </Field>
            <Field label="Vendedor">
              <Input
                value={seller}
                onChange={(e) => {
                  setSeller(e.target.value);
                  setPage(0);
                }}
              />
            </Field>
            <Field label="Nível mínimo">
              <Input
                type="number"
                min="0"
                max="15"
                value={level}
                onChange={(e) => setLevel(Number(e.target.value))}
              />
            </Field>
            <Field label="Preço máximo">
              <Input
                type="number"
                min="1"
                value={max}
                onChange={(e) => setMax(Number(e.target.value))}
              />
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={excellent}
                onChange={(e) => setExcellent(e.target.checked)}
              />
              <Translated text="Apenas Excellent" />
            </label>
          </div>
          <AdvancedFilters
            value={advanced}
            onChange={(next) => {
              setAdvanced(next);
              setPage(0);
            }}
          />
          <p className="muted mb-4">
            <Translated text={listings.length} />
            <Translated text="itens encontrados" />
          </p>
          <div className="grid-cards">
            {listings.slice(page * 8, page * 8 + 8).map((l) => (
              <ListingCard
                key={l.id}
                listing={l}
                onBuy={() => setSelection({ id: l.id, offer: false })}
                onOffer={() => setSelection({ id: l.id, offer: true })}
              />
            ))}
          </div>
          {!listings.length && (
            <p className="panel muted">
              <Translated text="Nenhum item para estes filtros. Tente outra busca." />
            </p>
          )}
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button
              variant="secondary"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              <Translated text="Anterior" />
            </Button>
            <span>
              <Translated text="Página" />
              <Translated text={page + 1} />
            </span>
            <Button
              variant="secondary"
              disabled={(page + 1) * 8 >= listings.length}
              onClick={() => setPage(page + 1)}
            >
              <Translated text="Próxima" />
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="create">
          <CreateListing />
        </TabsContent>
        {(["mine", "offers", "transactions"] as const).map((tab) => (
          <TabsContent value={tab} key={tab}>
            <MarketActivity tab={tab} />
          </TabsContent>
        ))}
      </Tabs>
      <MarketDialog selection={selection} onClose={() => setSelection(null)} />
    </div>
  );
}
