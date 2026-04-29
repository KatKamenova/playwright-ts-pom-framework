import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {
  readonly signupLoginButton: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly signupButton: Locator;

  // Step 2 fields
  readonly genderMr: Locator;
  readonly passwordInput: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly address: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipcode: Locator;
  readonly mobileNumber: Locator;
  readonly createAccountButton: Locator;
  readonly accountCreatedText: Locator;

  constructor(page: Page) {
    super(page);

    this.signupLoginButton = page.getByRole("link", {
      name: /signup \/ login/i,
    });
    this.nameInput = page.locator('input[data-qa="signup-name"]');
    this.emailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');

    this.genderMr = page.locator("#id_gender1");
    this.passwordInput = page.locator("#password");
    this.firstName = page.locator("#first_name");
    this.lastName = page.locator("#last_name");
    this.address = page.locator("#address1");
    this.country = page.locator("#country");
    this.state = page.locator("#state");
    this.city = page.locator("#city");
    this.zipcode = page.locator("#zipcode");
    this.mobileNumber = page.locator("#mobile_number");
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
    this.accountCreatedText = page.locator('h2[data-qa="account-created"]');
  }

  async open() {
    await this.navigate("/");
    await this.signupLoginButton.click();
  }

  async startRegistration(name: string, email: string) {
    await this.fill(this.nameInput, name);
    await this.fill(this.emailInput, email);
    await this.click(this.signupButton);
  }

  async completeRegistration(password: string) {
    await this.genderMr.check();
    await this.fill(this.passwordInput, password);
    await this.fill(this.firstName, "Test");
    await this.fill(this.lastName, "User");
    await this.fill(this.address, "Test Street 1");
    await this.country.selectOption("Canada");
    await this.fill(this.state, "Test State");
    await this.fill(this.city, "Test City");
    await this.fill(this.zipcode, "12345");
    await this.fill(this.mobileNumber, "1234567890");

    await this.click(this.createAccountButton);
  }

  async verifyAccountCreated() {
    await this.expectVisible(this.accountCreatedText);
  }
}
