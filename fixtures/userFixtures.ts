import { test as base } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { DataGenerator } from "../utils/dataGenerator";

type User = {
  email: string;
  password: string;
};

export const test = base.extend<{ user: User }>({
  user: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);

    const email = DataGenerator.generateEmail();
    const password = DataGenerator.generatePassword();
    const name = DataGenerator.generateName();

    await registerPage.open();
    await registerPage.startRegistration(name, email);
    await registerPage.completeRegistration(password);
    await registerPage.verifyAccountCreated();

    await use({ email, password });
  },
});

export { expect } from "@playwright/test";
