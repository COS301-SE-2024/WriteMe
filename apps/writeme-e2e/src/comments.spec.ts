import { test, expect } from '@playwright/test';

test('able to comment', async ({ page }) => {
  await page.goto('https://writeme.co.za/');
  await page.getByTestId('sign_up_button').click();
  await page.getByPlaceholder('hi@dynasty-devs.com').click();
  await page.getByPlaceholder('hi@dynasty-devs.com').fill('test@gmail.com');
  await page.getByPlaceholder('hi@dynasty-devs.com').press('Tab');
  await page.getByPlaceholder('••••••••').fill('Password123!');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await page.locator('.pl-3 > div > .inline-flex').first().click();
  await page.getByPlaceholder('let us know your thoughts...').click();
  await page.getByPlaceholder('let us know your thoughts...').fill('test');
  await page.locator('section').getByRole('button').nth(3).click();
});