import { Translated } from "@/i18n/Translated";
import { Link } from "react-router-dom";

import { PageHeading } from "@/components/shared/PageHeading";
import { Field } from "@/components/shared/Field";
import { Input } from "@/components/shared/LocalizedInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthForm } from "@/features/auth/useAuthForm";

export function AuthPage({
  mode,
}: {
  mode: "login" | "register" | "changepass";
}) {
  const {
    user,
    dispatch,
    navigate,
    params,
    accepted,
    setAccepted,
    error,
    submit,
  } = useAuthForm(mode);
  const title =
    mode === "login"
      ? "Bem-vindo de volta."
      : mode === "register"
        ? "Entre no pesadelo."
        : "Proteja seu legado.";
  return (
    <div className="page">
      <div className="mx-auto max-w-md">
        <PageHeading
          eyebrow={
            mode === "register" ? "Sua jornada começa aqui" : "Conta Nightmare"
          }
          title={title}
          description="Dados locais de demonstração. Não use sua senha real."
        />
        <form className="panel form-stack" onSubmit={submit}>
          <Field label="Nome da conta">
            <Input
              name="username"
              defaultValue={user?.username}
              required
              autoComplete="username"
            />
          </Field>
          {mode === "register" && (
            <Field label="E-mail">
              <Input name="email" type="email" required />
            </Field>
          )}
          {mode === "changepass" && (
            <Field label="Senha atual">
              <Input
                name="old"
                type="password"
                required
                autoComplete="current-password"
              />
            </Field>
          )}
          <Field label={mode === "changepass" ? "Nova senha" : "Senha"}>
            <Input
              name="password"
              type="password"
              required
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
            />
          </Field>
          {mode !== "login" && (
            <Field label="Confirmar senha">
              <Input
                name="confirm"
                type="password"
                required
                autoComplete="new-password"
              />
            </Field>
          )}
          {mode === "register" && (
            <>
              <Field label="PIN de segurança">
                <Input name="pin" inputMode="numeric" required />
                <span className="muted text-xs">
                  <Translated text="6 a 10 dígitos. Usado em operações no jogo." />
                </span>
              </Field>
              <label className="flex items-center gap-3 text-sm">
                <Checkbox
                  checked={accepted}
                  onCheckedChange={(v) => setAccepted(v === true)}
                />
                <Translated text="Aceito os" />
                <Translated text={" "} />
                <Link to="/rules" className="underline">
                  <Translated text="termos e regras" />
                </Link>
              </label>
            </>
          )}
          {error && (
            <p role="alert" className="text-red-400">
              <Translated text={error} />
            </p>
          )}
          <Button type="submit">
            <Translated
              text={
                mode === "login"
                  ? "Entrar"
                  : mode === "register"
                    ? "Criar conta"
                    : "Atualizar senha"
              }
            />
          </Button>
          {mode === "login" && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                dispatch({ type: "session", username: "demo" });
                navigate(params.get("next") || "/account");
              }}
            >
              <Translated text="Explorar com conta demo" />
            </Button>
          )}
          <div className="flex justify-between text-sm">
            <Link
              to={mode === "register" ? "/login" : "/register"}
              className="underline"
            >
              <Translated
                text={
                  mode === "register" ? "Já tenho uma conta" : "Criar conta"
                }
              />
            </Link>
            <Link to="/changepass" className="underline">
              <Translated text="Alterar senha" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
