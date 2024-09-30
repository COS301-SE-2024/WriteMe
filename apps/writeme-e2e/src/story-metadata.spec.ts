import { test, expect } from '@playwright/test';

test('able to update story genre', async ({ page }) => {
    test.slow();
  await page.goto('https://writeme.co.za/');
  await page.getByTestId('sign_up_button').click();
  await page.getByPlaceholder('hi@dynasty-devs.com').click();
  await page.getByPlaceholder('hi@dynasty-devs.com').fill('test@gmail.com');
  await page.getByPlaceholder('hi@dynasty-devs.com').press('Tab');
  await page.getByPlaceholder('••••••••').fill('Password123!');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await page.locator('.pl-3 > div > .inline-flex').first().click();
  await page.getByRole('button', { name: 'More' }).click();
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByPlaceholder('Select Genres').click();
  await page.getByRole('option', { name: 'Speculative fiction' }).click();
  await page.getByRole('button', { name: 'Save Changes' }).click();
});

test('able to update story brief', async ({ page }) => {
    await page.goto('https://writeme.co.za/');
    await page.getByTestId('sign_up_button').click();
    await page.getByPlaceholder('hi@dynasty-devs.com').click();
    await page.getByPlaceholder('hi@dynasty-devs.com').fill('test@gmail.com');
    await page.getByPlaceholder('hi@dynasty-devs.com').press('Tab');
    await page.getByPlaceholder('••••••••').fill('Password123!');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await page.locator('.pl-3 > div > .inline-flex').first().click();
    await page.getByRole('button', { name: 'More' }).click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByPlaceholder('short, sweet, impactful').click();
    await page.getByPlaceholder('short, sweet, impactful').fill('testing');
    await page.getByRole('button', { name: 'Save Changes' }).click();
  });