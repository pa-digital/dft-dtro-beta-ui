import { Page, Locator } from '@playwright/test';

export class TwoFAPage {
  readonly page: Page;
  readonly verifyEmailButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.verifyEmailButton = page.locator('data-testid=verify-email');
  }

  async enter2faCode(code: string) {
    for (let i = 0; i < code.length; i++) {
      const selector = `[data-testid="2fa-${i}"]`;
      await this.page.fill(selector, code[i]);
    }
  }

  async verifyEmail() {
    await this.verifyEmailButton.click();
  }
}
