// https://documenter.getpostman.com/view/6199862/SzYewFs9

// zakladny smoke test -> 200 OK response && obsauje data

// overit kombinaciu paramterov
import test, { expect, request } from "@playwright/test";

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

  test("query param", async ({ request }) => {
    const response = await request.get("http://localhost:3000/spells", {
      params: {
        type: "Jinx",
      },
    });

    const responseJson = await response.json();
    console.log(responseJson);
  });
});
// S: overit query parameter type
// S: overit query parameter isUnforigvable
// S: overit limit
