import test, { expect } from "@playwright/test";
test.describe("Quote generator", () => {
  test.beforeEach("open page", async ({ page }) => {
    await page.goto("#/quotes");
  });

  test("display qoute on click on get quote button", async ({ page }) => {
    await page.getByRole("button", { name: "Get Quote" }).click();
    await expect(page.locator("ul.quote-list").locator("li")).toBeVisible();
  });

  test("check title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Potter Quotes" }),
    ).toBeVisible();
  });

  test("remove quote should be disabled", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Remove Quote" }),
    ).toBeDisabled();
  });

  test("empty list message should be shown on page open", async ({ page }) => {
    await expect(page.locator("div.empty-list-message")).toHaveText(
      "Click the button to get some wisdom",
    );
  });

  test("5 quotes can be added", async ({ page }) => {
    for (let index = 0; index < 5; index++) {
      await page.getByRole("button", { name: "Get Quote" }).click();
    }
    await expect(page.locator("ul.quote-list").locator("li")).toHaveCount(5);
  });
});
