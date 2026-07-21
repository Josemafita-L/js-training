import { test, expect } from '@playwright/test';

test.describe('Intern Dashboard', () => {

  // Navigate to the application before every test so each test starts
  // from a clean page state. This avoids repeating page.goto('/')
  // in every individual test and ensures each test is independent.
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows the page title', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Intern Dashboard' })
    ).toBeVisible();
  });

  test('shows the initial intern names', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Rahul' })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Priya' })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Amit' })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Sneha' })
    ).toBeVisible();
  });

  test('shows the correct number of intern cards', async ({ page }) => {
    // Each card has a Remove button, so counting Remove buttons
    // is an easy way to count the number of intern cards.
    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4);
  });

  // toBeVisible() checks that an element exists and is visible to the user.
  // React Testing Library's toBeInTheDocument() only checks that
  // the element exists in the DOM, even if it is hidden.
  test('shows the theme toggle button', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toBeVisible();
  });

});

test.describe('Locator Practice — getByRole', () => {

  // Navigate to the application before every test so each test
  // starts from a clean page state.
  // getByText() searches for visible text on the page.
// Since "Rahul" appears in multiple places in this application,
// .first() is used to select the first matching element and
// avoid Playwright's strict mode violation.
test.describe('Assertions', () => {

  // Navigate to the application before every test
  // so each assertion starts from a clean state.
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // toHaveText() checks that the element's text matches
  // exactly, whereas toContainText() only checks that the
  // expected text is included within the element's text.
  test('heading has the correct text', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Intern Dashboard' })
    ).toHaveText('Intern Dashboard');
  });

  test('theme toggle button contains the word "Dark"', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toContainText('Dark');
  });

  test('error message is not visible initially', async ({ page }) => {
    await expect(
      page.getByText('Name is required')
    ).not.toBeVisible();
  });

  test('name input is empty initially', async ({ page }) => {
    await expect(
      page.getByPlaceholder('Intern Name')
    ).toHaveValue('');
  });

  test('score input is 0 initially', async ({ page }) => {
    await expect(
      page.getByPlaceholder('Score')
    ).toHaveValue('0');
  });

  test('correct number of Remove buttons matches the intern count', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4);
  });

  // Observation:
  // When toHaveCount(5) is used instead of toHaveCount(4),
  // Playwright automatically retries until the timeout expires
  // (about 5 seconds by default) before reporting that the
  // expected count does not match the actual count.
});
test('finds text with exact matching', async ({ page }) => {
  await expect(
    page.getByText('Rahul').first()
  ).toBeVisible();
});

test('finds text with regex matching', async ({ page }) => {
  // Matches any score such as:
  // Score: 92
  // Score: 78
  // Score: 65
  //
  // .first() is needed because multiple interns have scores,
  // so the regex matches several elements.
  await expect(
    page.getByText(/Score: \d+/).first()
  ).toBeVisible();
});

test('asserts that an absent element is not visible', async ({ page }) => {
  // Nobody named "Placeholder" exists in the initial intern list.
  await expect(
    page.getByText('Placeholder')
  ).not.toBeVisible();
});
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // getByRole is the preferred locator because it uses accessible
  // roles and names, making tests more reliable and closer to how
  // real users interact with the application. Unlike getByTestId,
  // it encourages accessible UI and reduces reliance on implementation details.
  test('finds the Add Intern button by role', async ({ page }) => {
    const addButton = page.getByRole('button', { name: 'Add Intern' });

    await expect(addButton).toBeVisible();
  });

  test('finds the heading by role', async ({ page }) => {
    const heading = page.getByRole('heading', {
      name: 'Intern Dashboard',
    });

    await expect(heading).toBeVisible();
  });

  test('finds the name input by role', async ({ page }) => {
    const nameInput = page.getByRole('textbox', {
      name: 'Intern Name',
    });

    await expect(nameInput).toBeVisible();
  });

  test('finds the name input by placeholder', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Intern Name');

    await expect(nameInput).toBeVisible();
    await expect(nameInput).toBeEmpty();
  });

  test('finds the score input by placeholder', async ({ page }) => {
    const scoreInput = page.getByPlaceholder('Score');

    await expect(scoreInput).toBeVisible();
  });

});