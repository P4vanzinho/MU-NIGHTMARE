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
