import { test, expect } from "@playwright/test";
test("notícias movem continuamente, pausam e não duplicam links acessíveis", async ({
  page,
}) => {
  await page.goto("/");
  const conveyor = page.locator(".news-conveyor");
  const track = page.locator(".news-conveyor-track");
  const first = await track.evaluate((el) => getComputedStyle(el).transform);
  await page.waitForTimeout(250);
  expect(await track.evaluate((el) => getComputedStyle(el).transform)).not.toBe(
    first,
  );
  await page
    .getByRole("button", { name: "Pausar notícias", exact: true })
    .click();
  const stopped = await track.evaluate((el) => getComputedStyle(el).transform);
  await page.waitForTimeout(250);
  expect(await track.evaluate((el) => getComputedStyle(el).transform)).toBe(
    stopped,
  );
  await expect(
    conveyor.getByRole("link", { name: /Season 6 está no ar/ }),
  ).toHaveCount(1);
  await expect(
    page.getByRole("link", { name: "Ver todas", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Retomar notícias", exact: true })
    .click();
  await expect(conveyor).toHaveAttribute("data-paused", "false");
  await page
    .getByRole("button", { name: "Pausar notícias", exact: true })
    .click();
  await conveyor.getByRole("link", { name: /Season 6 está no ar/ }).click();
  await expect(page).toHaveURL(/news\/season-6$/);
});
test("status no header cabe no mobile e abre detalhes simulados", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto("/");
  const header = page.locator("header");
  await expect(header.getByText("284 online", { exact: true })).toBeVisible();
  await expect(header.getByText("EXP ×3", { exact: true })).toBeVisible();
  await expect(header.getByText("DROP ×3", { exact: true })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole("button", { name: "Informações do servidor", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Informações do servidor", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Status e jogadores são dados simulados deste protótipo."),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Conhecer o servidor", exact: true })
    .click();
  await expect(page).toHaveURL(/\/server$/);
});
test("movimento reduzido inicia notícias pausadas", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".news-conveyor")).toHaveAttribute(
    "data-paused",
    "true",
  );
  await expect(
    page.getByRole("button", { name: "Retomar notícias", exact: true }),
  ).toBeVisible();
});
