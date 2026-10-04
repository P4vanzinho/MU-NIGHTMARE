export function parseJewels(data: FormData) {
  return data.getAll("jewelName").map((name, i) => ({
    name: String(name),
    quantity: Number(data.getAll("jewelQty")[i]),
  }));
}
