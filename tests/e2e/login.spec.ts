import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Login functionality", () => {
  test("Successful login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();
    await loginPage.login("test@test.com", "password123");

    await expect(page).toHaveURL(/.*account/);
  });

  test("Unsuccessful login - Invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();
    await loginPage.login("invalid@test.com", "wrongpassword");

    await expect(loginPage.errorMessage).toBeVisible();
  });
});
