import { createContext } from "react";
import type { GameContextValue } from "@/types/store";
export const GameContext = createContext<GameContextValue | null>(null);
