import test, { expect } from "@playwright/test";

test("it sorts student", async ({ page }) => {
  await page.goto("http://localhost:8080/#/sortingHat");
  await page.locator('[data-test="sort-button"]').click();
  //http://localhost:3000/sortingHat

  await page.waitForResponse("http://localhost:3000/sortingHat");
  await expect(page.locator('[data-test="result-message"]')).toBeVisible();
  await expect(page.locator('[data-test="house-result"]')).toBeVisible();
});
