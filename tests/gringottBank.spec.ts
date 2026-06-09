import test, { expect } from "@playwright/test";
import { formatCurrency } from "../utils";
import { faker } from "@faker-js/faker";

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

test("new investment can be created and correct data are shown", async ({
  page,
}) => {
  const investmentData = {
    fund: "Galleon Guardian Fund",
    investment: "10000",
    years: "20",
    customerName: faker.person.fullName(),
  };
  await page.goto("http://localhost:8080/#/gringottsBank");
  await page.locator('[id="selectedFund"]').selectOption(investmentData.fund);
  await page
    .locator('input[id="oneTimeInvestment"]')
    .fill(investmentData.investment);

  await page.locator('input[id="years"]').fill(investmentData.years);
  await page.getByRole("button", { name: "Make me an offer" }).click();

  const offerDetail = page.locator("div.offer-detail");
  await offerDetail
    .locator('[data-test="customer-name"]')
    .fill(investmentData.customerName);

  await offerDetail.getByRole("button", { name: "Create Investment" }).click();

  const investmentWrapper = page
    .locator("ul.investment-list")
    .locator("li")
    .filter({ hasText: investmentData.customerName });

  await expect(investmentWrapper).toBeVisible();
  await investmentWrapper.getByRole("button", { name: "View Details" }).click();

  const investmentDialog = page.getByRole("dialog");
  await expect(investmentDialog).toBeVisible();

  await expect(
    investmentDialog
      .locator("div.modal-body")
      .locator("p")
      .filter({ hasText: "Fund" }),
  ).toContainText(investmentData.fund);

  await expect(
    investmentDialog
      .locator("div.modal-body")
      .locator("p")
      .filter({ hasText: "Name" }),
  ).toContainText(investmentData.customerName);

  await expect(
    investmentDialog
      .locator("div.modal-body")
      .locator("p")
      .filter({ hasText: "Years" }),
  ).toContainText(investmentData.years);

  await expect(
    investmentDialog
      .locator("div.modal-body")
      .locator("p")
      .filter({ hasText: "Fund" }),
  ).toHaveText(`Fund: ${investmentData.fund}`);

  await expect(
    investmentDialog
      .locator("div.modal-body")
      .locator("p")
      .filter({ hasText: `Fund: ${investmentData.fund}` }),
  ).toBeVisible();

  await expect(investmentDialog.locator("div.modal-body")).toContainText(
    `Fund: ${investmentData.fund}`,
  );

  console.log(`Fund: ${investmentData.fund}`);
  console.log(`Name: ${investmentData.customerName}`);
});

//zaverecna samostatna praca, vytvorte nasledovny test
//7. overim ze v details je spravne zobrazene fond, meno, pocet rokov
