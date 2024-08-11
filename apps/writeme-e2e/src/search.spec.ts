import { test, expect } from '@playwright/test';

test('able to search for karma', async ({ page }) => {
    test.slow();
  await page.goto('https://writeme.co.za/');
  await page.waitForTimeout(2000)
  await page.getByRole('link', { name: 'Explore' }).click();
  await page.getByTestId('sign_up_button').click();
  await page.getByPlaceholder('hi@dynasty-devs.com').click();
  await page.getByPlaceholder('hi@dynasty-devs.com').fill('test@gmail.com');
  await page.getByPlaceholder('hi@dynasty-devs.com').press('Tab');
  await page.getByPlaceholder('••••••••').fill('Password123!');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await page.getByRole('link', { name: 'Explore' }).click();
  await page.locator('div').filter({ hasText: /^My StoriesNew StoryWriteathonsBetaExplore$/ }).getByRole('button').nth(2).click();
  await page.getByPlaceholder('Search...').fill('Karma');
  await page.getByPlaceholder('Search...').press('Enter');
  await page.getByRole('link', { name: 'A whole new world of Karma A' }).click();
});