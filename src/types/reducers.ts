import type { Action, State } from "./domain";
export type MarketAction = Extract<
  Action,
  { type: "list" | "cancel" | "buy" | "offer" | "offerStatus" }
>;
export type OrderAction = Extract<Action, { type: "order" | "orderStatus" }>;
export type ApplyAction = (state: State, action: Action) => State;
