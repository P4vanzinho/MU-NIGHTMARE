import { test, expect } from "@playwright/test";

test("home mantém notícias, eventos em loop e duas promoções alternadas", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".image-promotion")).toHaveCount(2);
  await expect(page.locator(".image-promotion[data-reversed]")).toHaveCount(1);
  await expect(
    page.getByRole("link", { name: "Agenda", exact: true }),
  ).toHaveCount(0);
  const track = page.locator(".events-conveyor .news-conveyor-track");
  const first = await track.evaluate((el) => getComputedStyle(el).transform);
  await page.waitForTimeout(200);
  expect(await track.evaluate((el) => getComputedStyle(el).transform)).not.toBe(
    first,
  );
  await page
    .getByRole("button", { name: "Pausar eventos", exact: true })
    .click();
  await expect(page.locator(".events-conveyor .news-conveyor")).toHaveAttribute(
    "data-paused",
    "true",
  );
  await page.getByRole("link", { name: "Ver VIP FULL", exact: true }).click();
  await expect(page).toHaveURL(/shop\?product=vip-2$/);
  await expect(page.locator("article.ring-primary")).toContainText("VIP FULL");
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("dono publica e edita; curtidas e comentários persistem", async ({
  page,
}) => {
  await page.goto("/news");
  await expect(
    page.getByRole("button", { name: "Nova postagem", exact: true }),
  ).toHaveCount(0);
  await page.goto("/login");
  await page.getByRole("button", { name: "Explorar com conta demo" }).click();
  await page.goto("/news");
  await page
    .getByRole("button", { name: "Nova postagem", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await dialog
    .getByLabel("Título", { exact: true })
    .fill("Atualização de teste da equipe");
  await dialog
    .getByLabel("Resumo", { exact: true })
    .fill("Uma postagem para validar o fluxo do blog.");
  await dialog
    .getByLabel("Conteúdo", { exact: true })
    .fill(
      "Primeiro parágrafo da atualização do servidor.\n\nSegundo parágrafo com novidades da temporada.",
    );
  await dialog.getByRole("button", { name: "Publicar", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "Atualização de teste da equipe",
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Curtir · 0", exact: true }).click();
  await page
    .getByLabel("Seu comentário", { exact: true })
    .fill("Gostei da novidade!");
  await page
    .getByRole("button", { name: "Publicar comentário", exact: true })
    .click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Curtir · 1", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByText("Gostei da novidade!", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Editar postagem", exact: true })
    .click();
  await dialog
    .getByLabel("Título", { exact: true })
    .fill("Atualização revisada da equipe");
  await dialog
    .getByRole("button", { name: "Salvar postagem", exact: true })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Atualização revisada da equipe",
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Excluir comentário", exact: true })
    .click();
  await expect(
    page.getByText("Gostei da novidade!", { exact: true }),
  ).toHaveCount(0);
});

test("jogador comum comenta sem acesso editorial", async ({ page }) => {
  await page.goto("/register");
  await page.getByLabel("Nome da conta", { exact: true }).fill("leitor");
  await page.getByLabel("E-mail", { exact: true }).fill("leitor@demo.test");
  await page.getByLabel("Senha", { exact: true }).fill("Nightmare123");
  await page
    .getByLabel("Confirmar senha", { exact: true })
    .fill("Nightmare123");
  await page.getByLabel(/PIN de segurança/).fill("123456");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Criar conta", exact: true }).click();
  await page.goto("/news/season-6");
  await expect(
    page.getByRole("button", { name: "Editar postagem", exact: true }),
  ).toHaveCount(0);
  await page
    .getByLabel("Seu comentário", { exact: true })
    .fill("Vamos conquistar o castelo!");
  await page
    .getByRole("button", { name: "Publicar comentário", exact: true })
    .click();
  await expect(
    page.getByText("Vamos conquistar o castelo!", { exact: true }),
  ).toBeVisible();
});
