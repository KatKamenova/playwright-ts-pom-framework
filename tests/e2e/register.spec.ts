import { test, expect } from "@playwright/test";
import { RegisterPage } from "../../pages/RegisterPage";
import { DataGenerator } from "../../utils/dataGenerator";

test.describe("Registration flow", () => {
  test("should start user registration with valid data", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    const email = DataGenerator.generateEmail();
    const name = DataGenerator.generateName();

    await registerPage.open();
    await registerPage.startRegistration(name, email);

    await expect(page).toHaveURL(/.*signup/);
  });
});
