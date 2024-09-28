import { test, expect } from '@playwright/test';

test('able to bookmark', async ({ page }) => {
  await page.goto('https://writeme.co.za/');
  await page.getByTestId('sign_up_button').click();
  await page.getByPlaceholder('hi@dynasty-devs.com').fill('t');
  await page.getByPlaceholder('hi@dynasty-devs.com').click();
  await page.getByPlaceholder('hi@dynasty-devs.com').fill('test@gmail.com');
  await page.getByPlaceholder('hi@dynasty-devs.com').press('Tab');
  await page.getByPlaceholder('••••••••').fill('Password123!');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await page.getByRole('link', { name: 'Explore' }).click();
  await page.locator('div:nth-child(11) > div > div > .pl-3 > a').click();
  await page.getByRole('heading', { name: 'Chapters' }).click();
  await page.locator('button:nth-child(4)').click();
});


test('able to like', async ({ page }) => {
    await page.goto('https://writeme.co.za/');
    await page.getByTestId('sign_up_button').click();
    await page.getByPlaceholder('hi@dynasty-devs.com').fill('t');
    await page.getByPlaceholder('hi@dynasty-devs.com').click();
    await page.getByPlaceholder('hi@dynasty-devs.com').fill('test@gmail.com');
    await page.getByPlaceholder('hi@dynasty-devs.com').press('Tab');
    await page.getByPlaceholder('••••••••').fill('Password123!');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await page.getByRole('link', { name: 'Explore' }).click();
    await page.locator('div:nth-child(11) > div > div > .pl-3 > a').click();
    await page.getByRole('heading', { name: 'Chapters' }).click();
    await page.locator('button:nth-child(1)').click();
  });