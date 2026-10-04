import type { Action, State } from "./domain";
export interface GameContextValue {
  state: State;
  dispatch: (action: Action) => boolean;
}
