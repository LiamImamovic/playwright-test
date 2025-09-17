import { expect, test } from "@playwright/test";

test("unauthenticated user sees login message", async ({ page }) => {
  await page.goto("/");

  // Vérifier le titre de la page
  await expect(page.getByTestId("page-title")).toBeVisible();

  // Vérifier la section non authentifiée
  await expect(page.getByTestId("unauthenticated-section")).toBeVisible();
  await expect(page.getByTestId("login-message")).toBeVisible();

  // Vérifier que le bouton de connexion est présent
  await expect(page.getByTestId("sign-in-button")).toBeVisible();

  // Vérifier que le formulaire d'ajout n'est pas visible
  await expect(page.getByTestId("name-input")).not.toBeVisible();
  await expect(page.getByTestId("add-name-button")).not.toBeVisible();
});
