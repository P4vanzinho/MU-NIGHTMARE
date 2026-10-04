import { Translated } from "@/i18n/Translated";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { readState, saveState } from "@/lib/storage";
import { reduce } from "@/lib/reducer";
import { expireOrders } from "@/lib/expireOrders";
import { GameContext } from "./context";
import type { Action, State } from "@/types/domain";
export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(() =>
    expireOrders(readState(), Date.now()),
  );
  const latest = useRef(state);
  function commit(next: State) {
    saveState(next);
    latest.current = next;
    setState(next);
  }
  function dispatch(action: Action) {
    try {
      commit(reduce(expireOrders(latest.current, Date.now()), action));
      return true;
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Não foi possível concluir.",
      );
      return false;
    }
  }
  useEffect(() => {
    const timer = setInterval(() => {
      const next = expireOrders(latest.current, Date.now());
      if (next !== latest.current) commit(next);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <Translated text={children} />
    </GameContext.Provider>
  );
}
