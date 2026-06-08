import test from "@playwright/test";

test("offer is shown when investment data are entered", async ({ page }) => {
  await page.goto("http://localhost:8080/#/gringottsBank");
  await page
    .locator('[id="selectedFund"]')
    .selectOption("Galleon Guardian Fund");
  //3. zadam investiciu (pouzite metodu .fill('cislo')) - samostatne
  //4. zadam pocet rokov (pouzite metodu .fill('cislo') - samostatne
  //5. klikem na make me an offer - samostatne

  //6. overim ze sa mi spravne zobrazil fond - spolu
});
