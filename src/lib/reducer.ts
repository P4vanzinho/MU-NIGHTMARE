import { reduceMarket } from "./reducers/market";
import { reduceOrders } from "./reducers/orders";
import { updateUser } from "./reducers/users";
import type { Action, State } from "@/types/domain";
export function reduce(state: State, action: Action): State {
  switch (action.type) {
    case "register":
      if (state.users.some((u) => u.username === action.user.username))
        throw Error("Nome de conta já utilizado.");
      return {
        ...state,
        users: [...state.users, action.user],
        session: action.user.username,
      };
    case "session":
      return { ...state, session: action.username };
    case "user":
      return updateUser(state, action.user);
    case "report":
      return { ...state, reports: [...state.reports, action.report] };
    case "list":
    case "cancel":
    case "buy":
    case "offer":
    case "offerStatus":
      return reduceMarket(state, action, reduce);
    case "order":
    case "orderStatus":
      return reduceOrders(state, action, reduce);
  }
}
