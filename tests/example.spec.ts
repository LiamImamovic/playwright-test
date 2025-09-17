import { expect, test } from "@playwright/test";

test.describe("Liste de noms", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Attendre que l'application soit prête
    await page.waitForLoadState("networkidle");
  });

  test("ajout d'un nom dans la liste avec data-testid", async ({ page }) => {
    // Vérifie le titre
    await expect(page.locator("h1")).toHaveText("Liste de noms");

    // Tape un nom
    await page.fill("data-testid=name-input", "Alice");
    await page.click("data-testid=add-name-button");

    // Vérifie que le nom apparaît
    await expect(page.locator("ul li")).toHaveText("Alice");
  });

  test("ajout de plusieurs noms", async ({ page }) => {
    const names = ["Alice", "Bob", "Charlie"];

    for (const name of names) {
      await page.fill("data-testid=name-input", name);
      await page.click("data-testid=add-name-button");
    }

    // Vérifie que tous les noms apparaissent
    const listItems = page.locator("ul li");
    await expect(listItems).toHaveCount(3);

    for (let i = 0; i < names.length; i++) {
      await expect(listItems.nth(i)).toHaveText(names[i]);
    }
  });

  test("ne peut pas ajouter un nom vide", async ({ page }) => {
    const initialCount = await page.locator("ul li").count();

    await page.fill("data-testid=name-input", "   ");
    await page.click("data-testid=add-name-button");

    // Vérifie qu'aucun élément n'a été ajouté
    await expect(page.locator("ul li")).toHaveCount(initialCount);
  });

  test("input se vide après ajout", async ({ page }) => {
    await page.fill("data-testid=name-input", "Alice");
    await page.click("data-testid=add-name-button");

    // Vérifie que l'input est vide
    await expect(page.locator("data-testid=name-input")).toHaveValue("");
  });
});
