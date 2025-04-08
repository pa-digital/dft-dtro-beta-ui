import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailAddressInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailAddressInput = page.locator('data-testid=email-address');
    this.passwordInput = page.locator('data-testid=password');
    this.loginButton = page.locator('data-testid=login');
  }

  async goto() {
    await this.page.goto('/');
  }

  async enterEmailAddress(email: string) {
    await this.emailAddressInput.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}
