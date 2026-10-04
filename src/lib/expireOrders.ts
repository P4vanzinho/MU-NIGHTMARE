import type { State } from "@/types/domain";
export function expireOrders(state: State, now: number): State {
  const hasExpired = state.orders.some(
    (o) =>
      o.status === "pending" &&
      o.createdAt &&
      now - Date.parse(o.createdAt) >= 900000,
  );
  return hasExpired
    ? {
        ...state,
        orders: state.orders.map((o) =>
          o.status === "pending" &&
          o.createdAt &&
          now - Date.parse(o.createdAt) >= 900000
            ? { ...o, status: "expired" }
            : o,
        ),
      }
    : state;
}
