import { describe, it, expect } from "vitest";
import { reduce } from "./reducer";
import { seed } from "@/data/seed";
import type { State } from "@/types/domain";
const logged = (): State => ({ ...structuredClone(seed), session: "demo" });
describe("fluxos do protótipo", () => {
  it("compra debita moedas e entrega item uma única vez", () => {
    const next = reduce(logged(), { type: "buy", id: "market-1" });
    expect(next.users[0].coins).toBe(1650);
    expect(
      next.users[0].items.some((i) => i.id === "m1" && i.location === "site"),
    ).toBe(true);
    expect(next.transactions).toHaveLength(1);
    expect(() => reduce(next, { type: "buy", id: "market-1" })).toThrow();
  });
  it("impede compras sem saldo", () => {
    const state = logged();
    state.users[0].coins = 1;
    expect(() => reduce(state, { type: "buy", id: "market-1" })).toThrow(
      "Saldo insuficiente",
    );
  });
  it("anunciar reserva item e cancelar devolve", () => {
    const state = logged();
    const item = state.users[0].items[1];
    const listed = reduce(state, {
      type: "list",
      listing: {
        id: "test",
        item,
        seller: "demo",
        price: 100,
        currency: "NC",
        acceptsOffers: true,
      },
    });
    expect(listed.users[0].items.some((i) => i.id === item.id)).toBe(false);
    const cancelled = reduce(listed, { type: "cancel", id: "test" });
    expect(cancelled.users[0].items.some((i) => i.id === item.id)).toBe(true);
  });
  it("pagamento credita uma única vez e cancelamento não credita", () => {
    let state = logged();
    state = reduce(state, {
      type: "order",
      order: {
        id: "o1",
        user: "demo",
        title: "Coins",
        amount: 25,
        coins: 1000,
        status: "pending",
      },
    });
    const paid = reduce(state, {
      type: "orderStatus",
      id: "o1",
      status: "delivered",
    });
    expect(paid.users[0].coins).toBe(3500);
    expect(() =>
      reduce(paid, { type: "orderStatus", id: "o1", status: "delivered" }),
    ).toThrow();
    expect(
      reduce(state, { type: "orderStatus", id: "o1", status: "cancelled" })
        .users[0].coins,
    ).toBe(2500);
  });
  it("exige configuração PIX para vender em reais", () => {
    const state = logged();
    expect(() =>
      reduce(state, {
        type: "list",
        listing: {
          id: "t",
          item: state.users[0].items[1],
          seller: "demo",
          price: 20,
          currency: "BRL",
          acceptsOffers: true,
        },
      }),
    ).toThrow("Cadastre PIX");
  });
});
