import { test, expect } from "@playwright/test";
test("conta, compra, cofre, anúncio e pagamento", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Explorar com conta demo" }).click();
  await expect(page.getByRole("heading", { name: "Olá, demo." })).toBeVisible();
  await page.goto("/marketplace");
  await page.getByRole("button", { name: "Ver e comprar" }).first().click();
  await page.getByRole("button", { name: "Confirmar compra" }).click();
  await page.goto("/account");
  await expect(page.getByText("1650 NC")).toBeVisible();
  await page
    .getByRole("button", { name: "Banco do site", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Sword of Destruction +13" }),
  ).toBeVisible();
  await page.goto("/marketplace?tab=create");
  await page.getByLabel("Preço", { exact: true }).fill("450");
  await page.getByRole("button", { name: "Publicar anúncio" }).click();
  await page.getByRole("tab", { name: "Meus anúncios" }).click();
  await expect(
    page.getByRole("button", { name: "Cancelar anúncio" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Cancelar anúncio" }).click();
  await page.goto("/shop");
  await page
    .getByRole("button", { name: "Comprar", exact: true })
    .first()
    .click();
  await page
    .getByRole("button", { name: "Simular pagamento aprovado" })
    .click();
  await page.getByRole("button", { name: "Close", exact: true }).click();
  await page.goto("/account");
  await expect(page.getByText("2650 NC")).toBeVisible();
  await page.reload();
  await expect(page.getByText("2650 NC")).toBeVisible();
});
test("carrossel e mobile sem overflow", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Pausar", exact: true }).click();
  await page.getByRole("button", { name: "Destaque 2", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Nightmare Season 6" }),
  ).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(
    page.getByRole("menuitem", { name: "Marketplace", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
test("PIX do mercado reserva, cancela e entrega após confirmação", async ({
  page,
}) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Explorar com conta demo" }).click();
  await page.goto("/marketplace");
  const card = page.locator("article").filter({
    has: page.getByRole("heading", { name: "Wings of Dragon +11" }),
  });
  await card.getByRole("button", { name: "Ver e comprar" }).click();
  await page.getByRole("button", { name: "Continuar para PIX demo" }).click();
  await expect(
    page.getByText("Pagamento simulado", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Cancelar pedido" }).click();
  await page.getByRole("button", { name: "Close", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Wings of Dragon +11" }),
  ).toBeVisible();
  await card.getByRole("button", { name: "Ver e comprar" }).click();
  await page.getByRole("button", { name: "Continuar para PIX demo" }).click();
  await page
    .getByRole("button", { name: "Simular pagamento aprovado" })
    .click();
  await page.getByRole("button", { name: "Close", exact: true }).click();
  await page.goto("/account");
  await page
    .getByRole("button", { name: "Banco do site", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Wings of Dragon +11" }),
  ).toBeVisible();
});
test("todas as rotas públicas renderizam sem erro de JavaScript", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const path of [
    "/",
    "/server",
    "/download",
    "/register",
    "/changepass",
    "/shop",
    "/marketplace",
    "/stats",
    "/events",
    "/news",
    "/news/season-6",
    "/rules",
    "/bugreport",
    "/community",
    "/donation",
    "/search?q=loja",
  ]) {
    await page.goto(path);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
  }
  expect(errors).toEqual([]);
});
test("idioma persiste e header cabe em celular de 320 px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Idioma / Language" }).click();
  await expect(
    page.getByRole("heading", { name: "Power has a new name." }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Power has a new name." }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.goto("/server");
  await expect(
    page.getByRole("heading", { name: "A darker world awaits." }),
  ).toBeVisible();
});
