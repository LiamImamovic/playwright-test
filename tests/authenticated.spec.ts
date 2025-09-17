import { expect, test } from "@playwright/test";

test("authenticated user can add name", async ({ page }) => {
  await page.goto("/");

  // Vérifier qu'on est connecté
  await expect(page.getByTestId("sign-out-button")).toBeVisible();
  await expect(page.getByTestId("authenticated-user")).toBeVisible();

  // Attendre que la liste soit chargée
  await page.waitForLoadState("networkidle");

  // Tester l'ajout d'un nom
  const testName = `Test Name ${Date.now()}`;
  await page.getByTestId("name-input").fill(testName);

  // Intercepter la requête API
  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/api/names") &&
      response.request().method() === "POST",
  );

  await page.getByTestId("add-name-button").click();

  // Vérifier que l'API a été appelée avec succès
  const response = await responsePromise;
  expect(response.status()).toBe(200);

  const responseData = await response.json();
  expect(responseData.name).toBeDefined();
  expect(responseData.name.value).toBe(testName);

  // Vérifier que le nom apparaît dans l'interface
  await expect(page.getByTestId("names-list")).toBeVisible();
  await expect(page.getByText(testName)).toBeVisible();
});
