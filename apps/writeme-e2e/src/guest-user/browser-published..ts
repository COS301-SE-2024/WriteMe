import { test, expect } from '@playwright/test';

test('as a guest user can access and share a published story', async ({ page }) => {
  await page.goto('https://writeme.co.za/');
  await page.getByRole('link', { name: 'Explore' }).click();
  await page.getByRole('heading', { name: 'The Whispering Woods' }).click();
  await page.locator('div:nth-child(3) > div > div > .pl-3 > a').click();
  await page.locator('button:nth-child(2)').first().click();
  await page.getByRole('dialog').getByRole('button').nth(1).click();
});
