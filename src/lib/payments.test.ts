import { describe, it, expect } from "vitest";
import { reduce } from "./reducer";
import { expireOrders } from "./expireOrders";
import { seed, makeUser } from "@/data/seed";
import type { State } from "@/types/domain";
const logged = (): State => ({ ...structuredClone(seed), session: "demo" });
describe("pagamentos e negociação", () => {
  it("reserva PIX impede outro comprador e expiração libera", () => {
    let state = logged();
    state.users.push(makeUser("other", "other@local", "Test1234", "123456"));
    state = reduce(state, {
      type: "order",
      order: {
        id: "pix",
        user: "demo",
        title: "Wings",
        amount: 30,
        coins: 0,
        status: "pending",
        listing: state.listings[1],
      },
    });
    expect(() =>
      reduce({ ...state, session: "other" }, { type: "buy", id: "market-2" }),
    ).toThrow("reservado");
    expect(() =>
      reduce(state, {
        type: "order",
        order: { ...state.orders[0], id: "duplicate" },
      }),
    ).toThrow("reservado");
    const expired = expireOrders(state, Date.now() + 901000);
    expect(expired.orders[0].status).toBe("expired");
    const paid = reduce(expired, { type: "buy", id: "market-2" });
    expect(paid.users[0].items.some((i) => i.id === "m2")).toBe(true);
  });
  it("confirmação PIX entrega item e estorno devolve anúncio", () => {
    let state = logged();
    state = reduce(state, {
      type: "order",
      order: {
        id: "pix",
        user: "demo",
        title: "Wings",
        amount: 30,
        coins: 0,
        status: "pending",
        listing: state.listings[1],
      },
    });
    const paid = reduce(state, {
      type: "orderStatus",
      id: "pix",
      status: "delivered",
    });
    expect(paid.listings.some((l) => l.id === "market-2")).toBe(false);
    expect(paid.orders[0].status).toBe("delivered");
    const refunded = reduce(paid, {
      type: "orderStatus",
      id: "pix",
      status: "refunded",
    });
    expect(refunded.users[0].items.some((i) => i.id === "m2")).toBe(false);
    expect(refunded.listings.some((l) => l.id === "market-2")).toBe(true);
  });
  it("aceitar oferta credita vendedor e preserva sessão", () => {
    let state = logged();
    state.users.push(makeUser("Raven", "raven@local", "Test1234", "123456"));
    state = reduce(state, {
      type: "offer",
      offer: {
        id: "offer",
        listingId: "market-1",
        buyer: "demo",
        price: 800,
        currency: "NC",
        status: "pending",
      },
    });
    const sold = reduce(
      { ...state, session: "Raven" },
      { type: "offerStatus", id: "offer", status: "accepted" },
    );
    expect(sold.session).toBe("Raven");
    expect(sold.users[0].coins).toBe(1700);
    expect(sold.users[1].coins).toBe(3260);
    expect(sold.offers[0].status).toBe("accepted");
  });
  it("cesta de joias exige tipos únicos e debita todos", () => {
    let state = logged();
    state.listings[0] = {
      ...state.listings[0],
      currency: "Jewels",
      price: 30,
      jewels: [
        { name: "Bless", quantity: 10 },
        { name: "Soul", quantity: 20 },
      ],
    };
    const next = reduce(state, { type: "buy", id: "market-1" });
    expect(next.users[0].jewels.Bless).toBe(110);
    expect(next.users[0].jewels.Soul).toBe(60);
    state.listings[0].jewels = [
      { name: "Bless", quantity: 10 },
      { name: "Bless", quantity: 20 },
    ];
    expect(() => reduce(state, { type: "buy", id: "market-1" })).toThrow(
      "repita",
    );
  });
  it("recompra de VIP soma 30 dias e falha não credita", () => {
    let state = logged();
    state.users[0].vip = "VIP FULL";
    state.users[0].vipExpires = new Date(Date.now() + 86400000).toISOString();
    const before = Date.parse(state.users[0].vipExpires);
    state = reduce(state, {
      type: "order",
      order: {
        id: "vip",
        user: "demo",
        title: "VIP",
        amount: 59,
        coins: 0,
        vip: "VIP FULL",
        status: "pending",
      },
    });
    const paid = reduce(state, {
      type: "orderStatus",
      id: "vip",
      status: "delivered",
    });
    expect(Date.parse(paid.users[0].vipExpires!)).toBe(before + 30 * 86400000);
    expect(
      reduce(state, { type: "orderStatus", id: "vip", status: "failed" })
        .users[0],
    ).toEqual(state.users[0]);
  });
});
