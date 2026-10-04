import type { Currency, JewelAmount, User } from "@/types/domain";
export function validateJewels(rows: JewelAmount[] | undefined) {
  if (!rows?.length || rows.some((r) => !r.name || r.quantity <= 0))
    throw Error("Adicione joias com quantidades positivas.");
  if (new Set(rows.map((r) => r.name)).size !== rows.length)
    throw Error("Não repita o mesmo tipo de joia.");
}
export function moveCurrency(
  user: User,
  currency: Currency,
  price: number,
  rows: JewelAmount[] | undefined,
  direction: "debit" | "credit",
): User {
  if (currency === "BRL") return user;
  const sign = direction === "debit" ? -1 : 1;
  const fee = direction === "credit" ? 0.95 : 1;
  if (currency === "NC") {
    if (direction === "debit" && user.coins < price)
      throw Error("Saldo insuficiente.");
    return { ...user, coins: user.coins + sign * Math.floor(price * fee) };
  }
  const jewels = { ...user.jewels };
  const amounts =
    currency === "Jewels" ? rows || [] : [{ name: currency, quantity: price }];
  if (currency === "Jewels") validateJewels(amounts);
  for (const row of amounts) {
    const balance = jewels[row.name] || 0;
    if (direction === "debit" && balance < row.quantity)
      throw Error("Saldo insuficiente de " + row.name);
    jewels[row.name] = balance + sign * Math.floor(row.quantity * fee);
  }
  return { ...user, jewels };
}
