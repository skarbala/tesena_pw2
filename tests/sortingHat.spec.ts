import test, { expect } from "@playwright/test";

test("it sorts student", async ({ page }) => {
  await page.goto("http://localhost:8080/#/sortingHat");
  await page.locator('[data-test="sort-button"]').click();
  const response = await page.waitForResponse(
    "http://localhost:3000/sortingHat",
  );
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  await expect(page.locator('[data-test="result-message"]')).toBeVisible();
  await expect(page.locator('[data-test="result-message"]')).toHaveText(
    responseBody.sortingHatSays,
  );
  await expect(page.locator('[data-test="house-result"]')).toBeVisible();
  await expect(page.locator('[data-test="house-result"]')).toHaveText(
    responseBody.house,
  );
});
