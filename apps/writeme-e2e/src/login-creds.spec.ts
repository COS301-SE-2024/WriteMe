import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://writeme.co.za/');
  await page.getByTestId('sign_up_button').click();
  await page.getByPlaceholder('hi@dynasty-devs.com').click();
  await page.getByPlaceholder('hi@dynasty-devs.com').fill('test@gmail.com');
  await page.getByPlaceholder('hi@dynasty-devs.com').press('Tab');
  await page.getByPlaceholder('••••••••').fill('Password123!');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
});
