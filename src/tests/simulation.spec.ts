import { runAllSimulations } from "../src/simulation";

describe("Guardian Companion Spectrum Protocol", () => {
  it("runs lifecycle simulations without data loss or unauthorized access", async () => {
    const res = await runAllSimulations();
    expect(res.verdict).toBe("Stable");
    expect(res.state === "OBSERVING" || res.state === "GUARDIAN_ACTIVE").toBeTruthy();
  });
});


---
