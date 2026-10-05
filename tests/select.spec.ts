import { test, expect } from "@playwright/test";

test("ranking usa select acessível na mesma altura da busca e filtra por classe", async ({
  page,
}) => {
  await page.goto("/stats");
  const search = page.getByRole("textbox", { name: "Buscar personagem" });
  const select = page.getByRole("combobox", { name: "Classe" });
  expect((await search.boundingBox())!.height).toBe(
    (await select.boundingBox())!.height,
  );
  await select.click();
  await page.getByRole("option", { name: "Soul Master", exact: true }).click();
  await expect(page.locator("main button.data-row")).toHaveCount(5);
  await expect(page.locator("main button.data-row").first()).toContainText(
    "Soul Master",
  );
  await select.focus();
  expect(
    await select.evaluate((el) => getComputedStyle(el).boxShadow),
  ).not.toContain("3px");
});

test("select compartilhado mantém dados do formulário e reset", async ({
  page,
}) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Explorar com conta demo" }).click();
  await page.goto("/account");
  await page.getByRole("tab", { name: "Personagens", exact: true }).click();
  const form = page.locator("main form").first();
  const select = form.getByRole("combobox");
  await select.click();
  await page.getByRole("option", { name: "Summoner", exact: true }).click();
  expect(
    await form.evaluate((el) =>
      new FormData(el as HTMLFormElement).get("class"),
    ),
  ).toBe("Summoner");
  await form.evaluate((el) => (el as HTMLFormElement).reset());
  await expect(select).toHaveText("Blade Knight");
});

test("destaques do ranking preservam posição global ao filtrar", async ({
  page,
}) => {
  await page.goto("/stats");
  await expect(page.locator(".rank-badge[data-rank]")).toHaveCount(5);
  await expect(
    page.locator('.ranking-row[data-position="1"] .rank-emblem'),
  ).toBeVisible();
  await page.getByRole("textbox", { name: "Buscar personagem" }).fill("Shadow");
  const first = page.locator(".ranking-row").first();
  await expect(first).toHaveAttribute("data-position", "2");
  await expect(first.getByLabel("2º lugar", { exact: true })).toBeVisible();
  await first.click();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("heading", { name: "Shadow", exact: true }),
  ).toBeVisible();
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/stats");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
