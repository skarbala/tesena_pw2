// https://documenter.getpostman.com/view/6199862/SzYewFs9

// zakladny smoke test -> 200 OK response && obsauje data
// overit query parameter type
// overit query parameter isUnforigvable
// overit limit
// overit kombinaciu paramterov
import test, { expect } from "@playwright/test";

test.describe("GET /spells", () => {
  test("return 200 and contain list of spells", async ({ request }) => {
    const response = await request.get("http://localhost:3000/spells");
    await expect(response).toBeOK();
    //3. overim ze data nie su prazdne

    const responseJson = await response.json();
    console.log(responseJson.length);

    //overim ze nie je napr undefined
    expect(responseJson).toBeTruthy();
    //overim ze tam je aspon 1 kuzlo
    expect(responseJson.length).toBeGreaterThan(0);
    expect(responseJson.length).toEqual(151);
  });
});
