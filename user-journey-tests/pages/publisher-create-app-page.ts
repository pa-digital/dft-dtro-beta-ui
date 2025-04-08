import { Page, Locator } from '@playwright/test';

export class PublisherCreateAppPage {
  readonly page: Page;
  readonly appNameInput: Locator;
  readonly createAppButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.appNameInput = page.locator('data-testid=app-name');
    this.createAppButton = page.locator('data-testid=create');
  }

  async enterAppName(appName: string) {
    await this.appNameInput.fill(appName);
  }

  async createApp() {
    await this.createAppButton.click();
  }
}
