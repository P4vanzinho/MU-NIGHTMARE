import { Translated } from "@/i18n/Translated";
import { useGame } from "@/store/useGame";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/shared/Field";
import { Input } from "@/components/shared/LocalizedInput";
import { toast } from "sonner";
export function CharactersPanel() {
  const { user, dispatch } = useGame();
  if (!user) return null;
  return (
    <div className="grid-cards">
      {user.characters.map((char) => (
        <form
          key={char.id}
          className="panel form-stack"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const name = String(data.get("name"));
            if (!/^[a-zA-Z0-9]{3,10}$/.test(name)) {
              toast.error("Nome: 3 a 10 letras e números.");
              return;
            }
            if (user.coins < 200) {
              toast.error("Saldo insuficiente.");
              return;
            }
            dispatch({
              type: "user",
              user: {
                ...user,
                coins: user.coins - 200,
                characters: user.characters.map((c) =>
                  c.id === char.id
                    ? { ...c, name, className: String(data.get("class")) }
                    : c,
                ),
              },
            });
            toast.success("Personagem atualizado por 200 NC.");
          }}
        >
          <div>
            <h3 className="text-2xl font-bold">
              <Translated text={char.name} />
            </h3>
            <p className="muted">
              <Translated text="Nível" />
              <Translated text={char.level} /> ·{" "}
              <Translated text={char.resets} />
              <Translated text="resets" />
            </p>
          </div>
          <Field label="Nome">
            <Input name="name" defaultValue={char.name} />
          </Field>
          <Field label="Classe">
            <select name="class" defaultValue={char.className}>
              {[
                "Blade Knight",
                "Soul Master",
                "Muse Elf",
                "Dark Lord",
                "Magic Gladiator",
                "Summoner",
                "Rage Fighter",
              ].map((c) => (
                <option key={c}>
                  <Translated text={c} />
                </option>
              ))}
            </select>
          </Field>
          <Button type="submit">
            <Translated text="Salvar nome e classe · 200 NC" />
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              dispatch({
                type: "user",
                user: {
                  ...user,
                  characters: user.characters.map((c) =>
                    c.id === char.id ? { ...c, hidden: !c.hidden } : c,
                  ),
                },
              });
              toast.success("Visibilidade atualizada");
            }}
          >
            <Translated text={char.hidden ? "Mostrar" : "Ocultar"} />
            <Translated text="informações" />
          </Button>
        </form>
      ))}
    </div>
  );
}
