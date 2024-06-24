import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect h1 to contain a substring.
  expect(await page.locator('h1').first().innerText()).toContain('Welcome');
});

test('can click on sign up', async ({ page }) => {
  await page.goto('/');

  let signUpButton = await page.getByTestId('sign_up_button')
});
