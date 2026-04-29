import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = "/") {
    await this.page.goto(path, { waitUntil: "domcontentloaded" });
  }

  async click(locator: Locator) {
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    await expect(locator).toBeVisible();
    await locator.fill(value);
  }

  async expectVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async expectURLContains(value: string) {
    await expect(this.page).toHaveURL(new RegExp(value));
  }

  async acceptCookiesIfVisible() {
    const consentButton = this.page.getByRole("button", { name: /consent/i });

    try {
      if (await consentButton.isVisible({ timeout: 3000 })) {
        await consentButton.click();
      }
    } catch {
      // If the button is not found or not visible, we can safely ignore the error
    }
  }
}
