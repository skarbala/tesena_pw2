import test, { expect } from "@playwright/test";

test("it sorts student", async ({ page }) => {
  await page.goto("http://localhost:8080/#/sortingHat");
  await page.locator('[data-test="sort-button"]').click();

  const response = await page.waitForResponse(
    "http://localhost:3000/sortingHat",
  );
  expect(response.status()).toBe(200);
  //1. vytiahnem telo odpovede
  const responseBody = await response.json();
  console.log(responseBody);
  console.log(responseBody.house);

  //samostatne
  //2. overim ze hlaska a fakulta su spravne zobrazene na zaklade dat z odpovede

  await expect(page.locator('[data-test="result-message"]')).toBeVisible();
  await expect(page.locator('[data-test="result-message"]')).toHaveText(
    "data z odpovede",
  );

  await expect(page.locator('[data-test="house-result"]')).toBeVisible();
});
