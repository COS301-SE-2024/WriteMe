import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('sign_up_button').click();
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('Awesome');
  await page.getByPlaceholder('Name').press('Tab');
  await page.getByPlaceholder('email@example.com').fill('test@gmail.com');
  await page.getByPlaceholder('email@example.com').press('Tab');
  await page.getByLabel('Password', { exact: true }).fill('Password123!');
  await page.getByLabel('Password', { exact: true }).press('Tab');
  await page.getByLabel('Confirm Password').fill('Password123!');
  await page.getByRole('button', { name: 'Sign up →' }).click();
});
