import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.slow()
  await page.goto('https://writeme.co.za/');
  await page.getByTestId('sign_up_button').click();
  await page.waitForTimeout(2000)
  await page.getByPlaceholder('hi@dynasty-devs.com').click();
  await page.getByPlaceholder('hi@dynasty-devs.com').fill('test@gmail.com');
  await page.getByPlaceholder('hi@dynasty-devs.com').press('Tab');
  await page.getByPlaceholder('••••••••').fill('Password123!');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await page.locator('div').filter({ hasText: /^My StoriesNew StoryWriteathonsBetaExplore$/ }).getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('A really good title').click();
  await page.getByPlaceholder('A really good title').fill('First Story');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Create Story' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('link', { name: 'Create first chapter!' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Title *').click();
  await page.getByLabel('Title *').fill('Chapter 1');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
});
