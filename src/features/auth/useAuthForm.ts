import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useGame } from "@/store/useGame";
import { makeUser } from "@/data/seed";
import type { AuthMode } from "@/types/auth";
export function useAuthForm(mode: AuthMode) {
  const { state, user, dispatch } = useGame();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    const value = (key: string) => String(data.get(key) || "");
    const username = value("username");
    const password = value("password");
    if (mode === "login") {
      const account = state.users.find(
        (u) => u.username === username && u.password === password,
      );
      if (!account) {
        setError("Conta ou senha incorreta.");
        return;
      }
      dispatch({ type: "session", username });
      navigate(
        params.get("next")?.startsWith("/") ? params.get("next")! : "/account",
      );
      return;
    }
    if (!/^[a-zA-Z0-9]{3,10}$/.test(username)) {
      setError("Conta: 3 a 10 letras e números.");
      return;
    }
    if (password.length < 8 || password.length > 16) {
      setError("A senha deve ter entre 8 e 16 caracteres.");
      return;
    }
    if (password !== value("confirm")) {
      setError("As senhas não coincidem.");
      return;
    }
    if (mode === "register") {
      if (!/^\d{6,10}$/.test(value("pin"))) {
        setError("PIN: 6 a 10 dígitos.");
        return;
      }
      if (!accepted) {
        setError("Aceite os termos para continuar.");
        return;
      }
      if (
        dispatch({
          type: "register",
          user: makeUser(username, value("email"), password, value("pin")),
        })
      ) {
        toast.success("Conta demo criada!");
        navigate("/account");
      }
    } else {
      const target = state.users.find(
        (u) => u.username === username && u.password === value("old"),
      );
      if (!target) {
        setError("Conta ou senha atual incorreta.");
        return;
      }
      if (dispatch({ type: "user", user: { ...target, password } })) {
        toast.success("Senha da conta mockada atualizada.");
        navigate(user ? "/account" : "/login");
      }
    }
  }
  return {
    user,
    dispatch,
    navigate,
    params,
    accepted,
    setAccepted,
    error,
    submit,
  };
}
