import { test, expect } from "@playwright/test";

test("header público e menu da conta autenticada", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const header = page.locator("header");
  await expect(
    header.getByRole("link", { name: "Entrar", exact: true }),
  ).toBeVisible();
  for (const label of [
    "Servidor",
    "Conta",
    "Novidades",
    "Mais",
    "Minha conta",
    "Alterar senha",
  ])
    await expect(
      header.getByRole("link", { name: label, exact: true }),
    ).toHaveCount(0);
  await expect(
    header.getByRole("link", { name: "Reportar bug", exact: true }),
  ).toBeVisible();
  await expect(
    header.getByRole("link", { name: "Discord", exact: true }),
  ).toBeVisible();
  await expect(
    page.locator("footer").getByRole("link", { name: "Regras e políticas" }),
  ).toBeVisible();
  await header.getByRole("link", { name: "Entrar", exact: true }).click();
  await page.getByRole("button", { name: "Explorar com conta demo" }).click();
  await header.getByRole("button", { name: "demo", exact: true }).click();
  await expect(
    page.getByRole("menuitem", { name: "Minha conta", exact: true }),
  ).toBeVisible();
  await page.getByRole("menuitem", { name: "Sair", exact: true }).click();
  await expect(
    header.getByRole("link", { name: "Entrar", exact: true }),
  ).toBeVisible();
});

test("header mobile mantém acesso público sem opções privadas ou overflow", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1280, 1440, 1910]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 320, height: 780 });
  await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  await expect(
    page.getByRole("menuitem", { name: "Entrar", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("menuitem", { name: "Minha conta", exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("menuitem", { name: "Alterar senha", exact: true }),
  ).toHaveCount(0);
  await page.keyboard.press("Escape");
  await page.goto("/community");
  await expect(
    page.getByText("Mais fortes juntos", { exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByText(
      "Uma comunidade para jogar, negociar e compartilhar conquistas.",
      { exact: true },
    ),
  ).toHaveCount(0);
});
