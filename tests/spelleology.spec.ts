import { faker } from "@faker-js/faker";
import test, { expect } from "@playwright/test";

test("create new spell and check detail", async ({ page, request }) => {
  //define spell object
  const newSpell = {
    spell: faker.commerce.productName(),
    effect: faker.company.buzzPhrase(),
    type: "Curse",
    isUnforgivable: false,
  };
  const response = await request.post("http://localhost:3000/spells", {
    data: newSpell,
  });
  await expect(response).toBeOK();

  //open UI
  await page.goto("#/spelleology");
  //enter spell effect
  await page.locator('[data-test="search-input"]').fill(newSpell.effect);
  //wait for spell to be shown
  //click on spell
  await page
    .locator("ul.spells")
    .locator("li")
    .filter({ hasText: newSpell.effect })
    .click();

  const modal = page.locator("div.modal-container");
  await expect(modal).toBeVisible();

  await expect(modal).toContainText(newSpell.spell);
  await expect(modal).toContainText(newSpell.effect);
  await expect(modal).toContainText(newSpell.type);

  //check spell detail
});
