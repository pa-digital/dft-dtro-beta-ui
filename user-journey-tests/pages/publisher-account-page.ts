import { Page, Locator } from '@playwright/test';

export class PublisherAccountPage {
  readonly page: Page;
  readonly createPublisherAppLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createPublisherAppLink = page.locator('text=Create new publisher test app');
  }

  async createPublisherApp() {
    await this.createPublisherAppLink.click();
  }
}
