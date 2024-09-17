import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('browsing playwright.com', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'API' }).click();
  await page.getByLabel('Search').click();
  await page.getByPlaceholder('Search docs').click();
  await page.getByPlaceholder('Search docs').fill('getby');
  await page.getByPlaceholder('Search docs').press('ArrowDown');
  await page.getByPlaceholder('Search docs').press('ArrowDown');
  await page.getByPlaceholder('Search docs').press('Enter');
});