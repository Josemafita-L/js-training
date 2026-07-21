import { test, expect } from '@playwright/test';

test.describe('Intern Dashboard', () => {

  // Navigate to the application before every test so each test starts
  // from a clean state and avoids repeating page.goto('/') in every test.
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows the page title', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Intern Dashboard' })
    ).toBeVisible();
  });
test('shows the initial intern names', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Rahul' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Priya' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Amit' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Sneha' })).toBeVisible();
});

  test('shows the correct number of intern cards', async ({ page }) => {
    // Each card has a Remove button — count them to count the cards
    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4);
  });

  // toBeVisible() checks that an element exists and is visible to the user.
  // React Testing Library's toBeInTheDocument() only checks that the element
  // exists in the DOM, even if it is hidden.
  test('shows the theme toggle button', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toBeVisible();
  });

});