import { Translated } from "@/i18n/Translated";
import { useState } from "react";
import { PageHeading } from "@/components/shared/PageHeading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UiCatalog } from "@/features/catalog/UiCatalog";
import { PatternCatalog } from "@/features/catalog/PatternCatalog";
import { TokenCatalog } from "@/features/catalog/TokenCatalog";
export function ComponentsPage() {
  const [dialog, setDialog] = useState(false);
  return (
    <div className="page">
      <PageHeading title="Um sistema. Todas as telas." />
      <Tabs defaultValue="ui">
        <TabsList className="mb-6">
          <TabsTrigger value="ui">
            <Translated text="UI / shadcn" />
          </TabsTrigger>
          <TabsTrigger value="patterns">
            <Translated text="Padrões de produto" />
          </TabsTrigger>
          <TabsTrigger value="tokens">
            <Translated text="Tokens" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ui">
          <UiCatalog onDialog={() => setDialog(true)} />
        </TabsContent>
        <TabsContent value="patterns">
          <PatternCatalog onDialog={() => setDialog(true)} />
        </TabsContent>
        <TabsContent value="tokens">
          <TokenCatalog />
        </TabsContent>
      </Tabs>
      <Dialog open={dialog} onOpenChange={setDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Translated text="Dialog reutilizável" />
            </DialogTitle>
            <DialogDescription>
              <Translated text="Mesmo componente em checkout, detalhes de item e perfil do jogador." />
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setDialog(false)}>
            <Translated text="Concluir" />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
