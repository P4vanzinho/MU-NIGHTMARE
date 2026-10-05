import { test, expect } from "@playwright/test";

test("destaque de bugs abre reporte e footer é compartilhado", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Pausar", exact: true }).click();
  await page.getByRole("button", { name: "Destaque 3", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Encontrou um bug? Ganhe recompensas." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Entre no pesadelo.", exact: true }),
  ).toHaveCount(0);
  await page
    .locator(".hero")
    .getByRole("link", { name: "Reportar bug", exact: true })
    .click();
  await expect(page).toHaveURL(/\/bugreport$/);
  const footer = page.locator("footer");
  const signature = await footer.innerText();
  await page.goto("/login");
  await page.getByRole("button", { name: "Explorar com conta demo" }).click();
  expect(await footer.innerText()).toBe(signature);
  await expect(
    footer.getByRole("link", { name: "Discord", exact: true }),
  ).toBeVisible();
  await expect(
    footer.getByRole("link", { name: "Regras e políticas", exact: true }),
  ).toBeVisible();
  await expect(page.locator('a[href="/components"]')).toHaveCount(0);
  await page.goto("/components");
  await expect(
    page.getByRole("heading", { name: "Página não encontrada." }),
  ).toBeVisible();
});

test("home termina perto do footer e footer cabe no mobile", async ({
  page,
}) => {
  await page.goto("/");
  const content = await page.locator(".home-content").boundingBox();
  const events = await page
    .locator(".home-content .section")
    .last()
    .boundingBox();
  expect(
    content!.y + content!.height - events!.y - events!.height,
  ).toBeLessThanOrEqual(33);
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});
