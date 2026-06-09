// https://documenter.getpostman.com/view/6199862/SzYewFs9

// zakladny smoke test -> 200 OK response && obsauje data

// overit kombinaciu paramterov
import test, { expect } from "@playwright/test";

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
