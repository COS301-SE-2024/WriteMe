import { test, expect } from '@playwright/test';

test('able to edit chapter paragraphs', async ({ page }) => {
  await page.goto('https://writeme.co.za/');
  await page.getByTestId('sign_up_button').click();
  await page.getByPlaceholder('hi@dynasty-devs.com').click();
  await page.getByPlaceholder('hi@dynasty-devs.com').fill('test@gmail.com');
  await page.getByPlaceholder('hi@dynasty-devs.com').press('Tab');
  await page.getByPlaceholder('••••••••').fill('Password123!');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await page.locator('.pl-3 > div > .inline-flex').first().click();
  await page.getByRole('link', { name: 'Chapter 1' }).click();
  await page.locator('.bn-block-content:nth-child(1)').first().click();
  await page.locator('.z-1 > div > div').first().click();
  await page.locator('.bn-block-content:nth-child(1)').nth(1).click();
  await page.locator('.ProseMirror').fill('Chapter 1\n\n\n\n\nHello there\n\n\n');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
});

test('able to use improv', async ({ page }) => {
    await page.goto('https://writeme.co.za/');
    await page.getByTestId('sign_up_button').click();
    await page.getByPlaceholder('hi@dynasty-devs.com').click();
    await page.getByPlaceholder('hi@dynasty-devs.com').fill('test@gmail.com');
    await page.getByPlaceholder('hi@dynasty-devs.com').press('Tab');
    await page.getByPlaceholder('••••••••').fill('Password123!');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await page.locator('.pl-3 > div > .inline-flex').first().click();
    await page.getByRole('link', { name: 'Chapter 1' }).click();
    await page.getByRole('button', { name: 'Start Improv' }).click();
    await page.getByRole('textbox').first().fill('Why, even wild animals do not act in that way; they do not run amok so blindly that we cannot discern any purpose in their movements and their onslaughts.');
    await page.getByRole('button', { name: 'Save' }).first().click();
    await page.getByRole('button', { name: 'Close' }).click();
  });