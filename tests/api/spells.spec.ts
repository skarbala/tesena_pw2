// https://documenter.getpostman.com/view/6199862/SzYewFs9
import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("GET /spells", () => {
  test("returns 200 and contain list of spells", async ({ request }) => {
    const response = await request.get("http://localhost:3000/spells");
    await expect(response).toBeOK();

    const responseJson = await response.json();
    expect(responseJson).toBeTruthy();
    //overim ze tam je aspon 1 kuzlo
    expect(responseJson.length).toBeGreaterThan(0);
    expect(responseJson.length).toEqual(151);

    //overim ze kazde kuzlo ma vyplneny effect a nazov
    responseJson.forEach((spellItem) => {
      expect(spellItem.effect).toBeTruthy();
      expect(spellItem.id).toBeTruthy();
      expect(spellItem.spell).toBeTruthy();
      expect(spellItem.type).toBeTruthy();
      expect(spellItem.isUnforgivable).toBeDefined();
    });
  });

  test("get spells by type param", async ({ request }) => {
    const response = await request.get("http://localhost:3000/spells", {
      params: {
        type: "Jinx",
      },
    });

    const responseJson = await response.json();
    expect(responseJson.length).toBeGreaterThan(0);

    responseJson.forEach((spellItem) => {
      expect(spellItem.type).toEqual("Jinx");
    });
  });

  test("get spells by isUnforgivable param", async ({ request }) => {
    const response = await request.get("http://localhost:3000/spells", {
      params: {
        isUnforgivable: true,
      },
    });

    const responseJson = await response.json();
    expect(responseJson.length).toEqual(3);

    responseJson.forEach((spellItem) => {
      expect(spellItem.isUnforgivable).toEqual(true);
    });
  });

  test("get spells by limit param", async ({ request }) => {
    const response = await request.get("http://localhost:3000/spells", {
      params: {
        limit: 50,
      },
    });

    const responseJson = await response.json();
    expect(responseJson.length).toEqual(50);
  });
});

test("create new spell and get spell details", async ({ request }) => {
  const newSpell = {
    spell: faker.commerce.productName(),
    effect: faker.company.buzzPhrase(),
    type: "Curse",
    isUnforgivable: false,
  };
  //vytvorime nove kuzlo
  const response = await request.post("http://localhost:3000/spells", {
    data: newSpell,
  });

  const responseJson = await response.json();
  const spellId = responseJson.spell.id;
  expect(spellId).toBeTruthy();

  const spellResponse = await request.get(
    `http://localhost:3000/spells/${spellId}`,
  );
  await expect(spellResponse).toBeOK();
  const spellResponseJson = await spellResponse.json();

  expect(spellResponseJson.effect).toEqual(newSpell.effect);
});
