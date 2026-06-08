import test, { expect } from "@playwright/test";
test("display qoute on click on get quote button", async ({ page }) => {
  //1. otvorim stranku
  await page.goto("http://localhost:8080/#/quotes");
  //2. kliknem na button
  await page.getByRole("button", { name: "Get Quote" }).click();
  //3. overim ze hlaska je zobrazena
  await expect(page.locator("ul.quote-list").locator("li")).toBeVisible();
});

test("check title", async ({ page }) => {
  await page.goto("http://localhost:8080/#/quotes");
  await expect(
    page.getByRole("heading", { name: "Potter Quotes" }),
  ).toBeVisible();
});

test("remove quote should be disabled", async ({ page }) => {
  await page.goto("http://localhost:8080/#/quotes");

  await expect(
    page.getByRole("button", { name: "Remove Quote" }),
  ).toBeDisabled();
});

test("empty list message should be shown on page open", async ({ page }) => {
  await page.goto("http://localhost:8080/#/quotes");
  await expect(page.locator("div.empty-list-message")).toHaveText(
    "Click the button to get some wisdom",
  );
});

test("5 quotes can be added", async ({ page }) => {
  await page.goto("http://localhost:8080/#/quotes");
  for (let index = 0; index < 5; index++) {
    await page.getByRole("button", { name: "Get Quote" }).click();
  }
  await expect(page.locator("ul.quote-list").locator("li")).toHaveCount(5);
});

test("wrong selector", async ({ page }) => {
  await page.goto("http://localhost:8080/#/quotes");
  await page.locator('[data-test="get-quote"]').click();
});
