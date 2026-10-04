import { Translated } from "@/i18n/Translated";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/shared/LocalizedInput";
import { Field } from "@/components/shared/Field";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
export function UiCatalog({ onDialog }: { onDialog: () => void }) {
  return (
    <div className="grid-cards">
      <Card>
        <CardHeader>
          <CardTitle>
            <Translated text="Button" />
          </CardTitle>
          <CardDescription>
            <Translated text="Ações primárias, secundárias e discretas." />
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {(
            ["default", "secondary", "outline", "ghost", "destructive"] as const
          ).map((variant) => (
            <Button
              key={variant}
              variant={variant}
              onClick={() => toast.success("Ação " + variant)}
            >
              <Translated text={variant} />
            </Button>
          ))}
          <Button disabled>
            <Translated text="Disabled" />
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <Translated text="Formulários" />
          </CardTitle>
          <CardDescription>
            <Translated text="Labels explícitos, estados e foco visível." />
          </CardDescription>
        </CardHeader>
        <CardContent className="form-stack">
          <Field label="Input">
            <Input placeholder="Escreva aqui" />
          </Field>
          <Field label="Textarea">
            <Textarea placeholder="Detalhes" />
          </Field>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Escolha uma classe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="knight">
                <Translated text="Blade Knight" />
              </SelectItem>
              <SelectItem value="mage">
                <Translated text="Soul Master" />
              </SelectItem>
            </SelectContent>
          </Select>
          <label className="flex gap-3">
            <Checkbox />
            <Translated text="Checkbox acessível" />
          </label>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <Translated text="Feedback" />
          </CardTitle>
          <CardDescription>
            <Translated text="Badges, notificações e confirmação." />
          </CardDescription>
        </CardHeader>
        <CardContent className="form-stack">
          <div className="flex gap-3">
            <Badge>
              <Translated text="Online" />
            </Badge>
            <Badge variant="secondary">
              <Translated text="Season 6" />
            </Badge>
            <Badge variant="destructive">
              <Translated text="Erro" />
            </Badge>
          </div>
          <Separator />
          <Button onClick={() => onDialog()}>
            <Translated text="Abrir dialog" />
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.success("Operação concluída")}
          >
            <Translated text="Mostrar toast" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
