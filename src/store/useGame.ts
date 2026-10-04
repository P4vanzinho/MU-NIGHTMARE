import { useContext } from "react";
import { GameContext } from "./context";
export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw Error("GameProvider ausente");
  return {
    ...context,
    user: context.state.users.find((u) => u.username === context.state.session),
  };
}
