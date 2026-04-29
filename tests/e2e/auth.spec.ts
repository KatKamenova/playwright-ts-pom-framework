import { test, expect } from "../../fixtures/userFixtures";
import { LoginPage } from "../../pages/LoginPage";

test.describe("User creation flow", () => {
  test("Login with newly created user", async ({ page, user }) => {
    const loginPage = new LoginPage(page);

    await test.step("Open login page", async () => {
      await loginPage.openLoginPage();
    });

    await test.step("Login with created user", async () => {
      await loginPage.login(user.email, user.password);
    });

    await test.step("Verify successful login", async () => {
      await loginPage.verifyLoginSuccess();
    });
  });
});
