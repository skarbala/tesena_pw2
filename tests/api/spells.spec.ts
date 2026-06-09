// https://documenter.getpostman.com/view/6199862/SzYewFs9

// zakladny smoke test -> 200 OK response && obsauje data
// overit query parameter type
// overit query parameter isUnforigvable
// overit limit
// overit kombinaciu paramterov
import test, { expect } from "@playwright/test";

test.describe("GET /spells", () => {
  test("return 200 and contain list of spells", async ({ request }) => {
    request.get("http://localhost:3000/spells");
    //1.zavolam get request na http://localhost:3000/spells
    //2. overim ze odpoved je ok
    //3. overim ze data nie su prazdne
  });
});
