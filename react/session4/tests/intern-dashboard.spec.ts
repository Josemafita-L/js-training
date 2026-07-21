import { test, expect } from '@playwright/test';

//
// SECTION 2 — INTERN DASHBOARD
//
test.describe('Intern Dashboard', () => {

  // Navigate to the application before every test so each test starts
  // from a clean page state. This avoids repeating page.goto('/')
  // inside every individual test.
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
    // Each intern card has one Remove button.
    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4);
  });

  // toBeVisible() verifies that an element exists and is visible
  // to the user. React Testing Library's toBeInTheDocument()
  // only checks that the element exists in the DOM.
  test('shows the theme toggle button', async ({ page }) => {
    await expect(
      page.getByRole('button', {
        name: /switch to dark mode/i,
      })
    ).toBeVisible();
  });

});

//
// SECTION 3 — LOCATOR PRACTICE
//
test.describe('Locator Practice — getByRole', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // getByRole is preferred because it uses accessible roles
  // and names instead of implementation details like CSS selectors.
  test('finds the Add Intern button by role', async ({ page }) => {

    const addButton = page.getByRole('button', {
      name: 'Add Intern',
    });

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

  test('finds text with exact matching', async ({ page }) => {

    await expect(
      page.getByText('Rahul').first()
    ).toBeVisible();
  });

  test('finds text with regex matching', async ({ page }) => {

    // Multiple score elements match the regex.
    // .first() avoids Playwright strict mode violations.
    await expect(
      page.getByText(/Score: \d+/).first()
    ).toBeVisible();
  });

  test('asserts that an absent element is not visible', async ({ page }) => {

    await expect(
      page.getByText('Placeholder')
    ).not.toBeVisible();
  });

});

//
// SECTION 4 — ASSERTIONS
//
test.describe('Assertions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // toHaveText() checks for an exact text match.
  // toContainText() only checks that the expected
  // text appears somewhere inside the element.
  test('heading has the correct text', async ({ page }) => {

    await expect(
      page.getByRole('heading', {
        name: 'Intern Dashboard',
      })
    ).toHaveText('Intern Dashboard');
  });

  test('theme toggle button contains the word "Dark"', async ({ page }) => {

    await expect(
      page.getByRole('button', {
        name: /switch to dark mode/i,
      })
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
      page.getByRole('button', {
        name: 'Remove',
      })
    ).toHaveCount(4);
  });

  // Observation:
  // If toHaveCount(5) is used instead of toHaveCount(4),
  // Playwright retries automatically for about 5 seconds
  // before reporting the assertion failure.

});
//
// SECTION 5 — ADD INTERN JOURNEY
//
test.describe('Add Intern Journey', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Unlike a unit test, this verifies the complete end-to-end flow:
  // filling the real form, clicking the real button, updating state,
  // and rendering the new intern in the browser.
  test('adds a new intern and shows them in the list', async ({ page }) => {

    await page.getByPlaceholder('Intern Name').fill('Vikram');

    await page.getByPlaceholder('Score').clear();
    await page.getByPlaceholder('Score').fill('88');

    await page.getByRole('button', {
      name: 'Add Intern',
    }).click();

    await expect(
      page.getByText('Vikram').first()
    ).toBeVisible();

    await expect(
      page.getByText('Score: 88')
    ).toBeVisible();
  });

  test('intern count increases after adding', async ({ page }) => {

    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4);

    await page.getByPlaceholder('Intern Name').fill('Vikram');

    await page.getByRole('button', {
      name: 'Add Intern',
    }).click();

    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(5);
  });

  test('form clears after successful submission', async ({ page }) => {

    await page.getByPlaceholder('Intern Name').fill('Vikram');

    await page.getByPlaceholder('Score').clear();
    await page.getByPlaceholder('Score').fill('88');

    await page.getByRole('button', {
      name: 'Add Intern',
    }).click();

    await expect(
      page.getByPlaceholder('Intern Name')
    ).toHaveValue('');
  });

  // Playwright automatically waits for UI updates.
  // not.toBeVisible() is preferred over queryByText()
  // because Playwright retries until the element disappears.
  test('shows validation error when name is empty', async ({ page }) => {

    await page.getByRole('button', {
      name: 'Add Intern',
    }).click();

    await expect(
      page.getByText('Name is required')
    ).toBeVisible();
  });

  test('does not add intern when form is invalid', async ({ page }) => {

    await page.getByRole('button', {
      name: 'Add Intern',
    }).click();

    await expect(
      page.getByRole('button', {
        name: 'Remove',
      })
    ).toHaveCount(4);
  });

  test('validation error disappears after name is entered', async ({ page }) => {

    await page.getByRole('button', {
      name: 'Add Intern',
    }).click();

    await expect(
      page.getByText('Name is required')
    ).toBeVisible();

    await page.getByPlaceholder('Intern Name').fill('Vikram');

    await expect(
      page.getByText('Name is required')
    ).not.toBeVisible();
  });

});

//
// SECTION 5 — REMOVE INTERN JOURNEY
//
test.describe('Remove Intern Journey', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // locator.filter() could also be used to scope the Rahul card.
  // Example:
  //
  // const rahulCard = page.locator('div').filter({
  //   has: page.getByRole('heading', { name: 'Rahul' }),
  // });
  //
  // await rahulCard.getByRole('button', { name: 'Remove' }).click();

  test('removes an intern when Remove is clicked', async ({ page }) => {

    await expect(
      page.getByRole('heading', {
        name: 'Rahul',
      })
    ).toBeVisible();

    await page
      .getByRole('button', {
        name: 'Remove',
      })
      .first()
      .click();

    await expect(
      page.getByRole('heading', {
        name: 'Rahul',
      })
    ).not.toBeVisible();
  });

  test('intern count decreases after removal', async ({ page }) => {

    await expect(
      page.getByRole('button', {
        name: 'Remove',
      })
    ).toHaveCount(4);

    await page
      .getByRole('button', {
        name: 'Remove',
      })
      .first()
      .click();

    await expect(
      page.getByRole('button', {
        name: 'Remove',
      })
    ).toHaveCount(3);
  });

});

//
// SECTION 5 — THEME TOGGLE JOURNEY
//
test.describe('Theme Toggle Journey', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Unlike a unit test, Playwright verifies the real browser
  // interaction and confirms that the visible UI changes after
  // clicking the button.
  test('toggle button label changes from Dark to Light after click', async ({ page }) => {

    await expect(
      page.getByRole('button', {
        name: /switch to dark mode/i,
      })
    ).toBeVisible();

    await page
      .getByRole('button', {
        name: /switch to dark mode/i,
      })
      .click();

    await expect(
      page.getByRole('button', {
        name: /switch to light mode/i,
      })
    ).toBeVisible();
  });

  test('toggle switches back on second click', async ({ page }) => {

    await page
      .getByRole('button', {
        name: /switch to dark mode/i,
      })
      .click();

    await page
      .getByRole('button', {
        name: /switch to light mode/i,
      })
      .click();

    await expect(
      page.getByRole('button', {
        name: /switch to dark mode/i,
      })
    ).toBeVisible();
  });

});

//
// SECTION 6 — OBSERVATIONS
//

// UI Mode Observation:
// Playwright UI mode displays every action in sequence,
// highlights locators on the page, and allows stepping
// through the test interactively.

// Headless vs Headed:
// Headless mode runs without opening a browser and is
// faster for CI and automated execution.
// Headed mode opens the browser window, making it useful
// for debugging and watching interactions happen visually.

//
// SECTION 7 — HTML REPORT & TRACE VIEWER
//

// HTML Report Observation:
// The HTML report provides screenshots, execution timeline,
// stack trace, and detailed assertion failures that are not
// available directly in the terminal output.

// Trace Viewer Notes:
//
// 1. Timeline
//    Shows every Playwright action in chronological order.
//
// 2. Screenshots
//    Displays what the page looked like at each action.
//
// 3. Network
//    Helps diagnose failed API requests or slow responses.
//
// 4. DOM Snapshot
//    Lets you inspect the page structure exactly as it was
//    when each action executed.


// Observation:
// The HTML report provides more information than the terminal output.
// It includes a screenshot captured at the point of failure,
// the complete call log, the expected versus actual result,
// and the exact test step where the failure occurred, making debugging easier.

// Trace Viewer Notes:
//
// Timeline:
// Shows each Playwright action in chronological order.
// Useful for identifying exactly where a test failed.
//
// Screenshots:
// Displays the page after every action.
// Useful for verifying the UI state during execution.
//
// Network:
// Shows all HTTP requests and responses.
// Useful for debugging failed API calls or slow network requests.
//
// DOM Snapshot:
// Captures the DOM at every step.
// Useful for checking whether an element existed or contained the expected content.