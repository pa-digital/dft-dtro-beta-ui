import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { TwoFAPage } from '../pages/twofa-page';
import { PublisherAccountPage } from '../pages/publisher-account-page';
import { PublisherCreateAppPage } from '../pages/publisher-create-app-page';

test.describe('Tests to log in and create application', () => {
  test('publisher should log in and create application', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.enterEmailAddress('m@c.com');
    await loginPage.enterPassword('password');
    await loginPage.logIn();
    await expect(page).toHaveURL(/.*auth/);

    const twoFAPage = new TwoFAPage(page);
    await twoFAPage.enter2faCode("123456");
    await twoFAPage.verifyEmail();
    await expect(page).toHaveURL(/.*home/);

    const publisherAccountPage = new PublisherAccountPage(page);
    await publisherAccountPage.createPublisherApp();
    await expect(page).toHaveURL(/.*publisher\/create/);

    const publisherCreateAppPage = new PublisherCreateAppPage(page);
    await publisherCreateAppPage.enterAppName("My publisher app");
    await publisherCreateAppPage.createApp();
  });
});