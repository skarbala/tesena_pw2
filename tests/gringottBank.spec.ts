import test, { expect } from "@playwright/test";

test("offer is shown when investment data are entered", async ({ page }) => {
  const investmentData = {
    fund: "Galleon Guardian Fund",
    investment: "10000",
    years: "20",
  };
  //arrange
  await page.goto("http://localhost:8080/#/gringottsBank");
  await page.locator('[id="selectedFund"]').selectOption(investmentData.fund);
  await page
    .locator('input[id="oneTimeInvestment"]')
    .fill(investmentData.investment);
  await page.locator('input[id="years"]').fill(investmentData.years);
  //act
  await page.getByRole("button", { name: "Make me an offer" }).click();

  //assert
  const offerDetail = page.locator("div.offer-detail");

  await expect(offerDetail).toBeVisible();
  //overim ze je zobrazeny nadpis the offer
  await expect(
    offerDetail.getByRole("heading", { name: "The offer" }),
  ).toBeVisible();

  await expect(
    offerDetail.locator("div.your-data").locator("p.fund").locator("span"),
  ).toHaveText(investmentData.fund);

  await expect(
    offerDetail.locator("div.your-data").locator("p.period").locator("span"),
  ).toContainText(investmentData.years);

  await expect(
    offerDetail
      .locator("div.your-data")
      .locator("p")
      .filter({ hasText: "Investment" })
      .locator("span"),
  ).toHaveText(formatCurrency(investmentData.investment));
});

function formatCurrency(
  value: number | string,
  currency = "GBP",
  locale = "en-GB",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(Number(value));
}

//zaverecna samostatna praca, vytvorte nasledovny test
//1. zadam investment data
//2. vytvorim offer
//3. zadam meno
//4. potvrdim offer (create investment)
//5. overim ze investment je zobrazeny v liste
//6. kliknem na View Details
//7. overim ze v details je spravne zobrazene fond, meno, pocet rokov
