import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly signupLoginButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.signupLoginButton = page.getByRole("link", {
      name: /signup \/ login/i,
    });
    this.emailInput = page.locator('input[data-qa="login-email"]');
    this.passwordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.errorMessage = page.locator('p[style*="color: red"]');
  }

  async openLoginPage() {
    await this.navigate("/");
    await this.signupLoginButton.click();
  }

  async login(email: string, password: string) {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }
  async verifyLoginSuccess() {
    await this.expectURLContains("account");
  }

  async verifyLoginError() {
    await this.expectVisible(this.errorMessage);
  }
}
