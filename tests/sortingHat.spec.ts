import test, { expect } from "@playwright/test";

test("it sorts student", async ({ page }) => {
  await page.goto("#/sortingHat");
  await page.locator('[data-test="sort-button"]').click();
  const response = await page.waitForResponse("**/sortingHat");
  expect(response.status()).toBe(200);
  const responseBody = await response.json();

  const resultMessage = page.locator('[data-test="result-message"]');
  await expect(resultMessage).toBeVisible();
  await expect(resultMessage).toHaveText(responseBody.sortingHatSays);

  const resultHouse = page.locator('[data-test="house-result"]');
  await expect(resultHouse).toBeVisible();
  await expect(resultHouse).toHaveText(responseBody.house);
});
