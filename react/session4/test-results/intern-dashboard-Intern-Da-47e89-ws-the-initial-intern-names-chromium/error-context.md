# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: intern-dashboard.spec.ts >> Intern Dashboard >> shows the initial intern names
- Location: tests\intern-dashboard.spec.ts:21:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Rahul' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Rahul' })

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | //
  4   | // SECTION 2 — INTERN DASHBOARD
  5   | //
  6   | test.describe('Intern Dashboard', () => {
  7   | 
  8   |   // Navigate to the application before every test so each test starts
  9   |   // from a clean page state. This avoids repeating page.goto('/')
  10  |   // inside every individual test.
  11  |   test.beforeEach(async ({ page }) => {
  12  |     await page.goto('/');
  13  |   });
  14  | 
  15  |   test('shows the page title', async ({ page }) => {
  16  |     await expect(
  17  | page.getByRole('heading', { name: 'Intern Dashboard' })
  18  | ).toBeVisible();
  19  |   });
  20  | 
  21  |   test('shows the initial intern names', async ({ page }) => {
  22  |     await expect(
  23  |       page.getByRole('heading', { name: 'Rahul' })
> 24  |     ).toBeVisible();
      |       ^ Error: expect(locator).toBeVisible() failed
  25  | 
  26  |     await expect(
  27  |       page.getByRole('heading', { name: 'Priya' })
  28  |     ).toBeVisible();
  29  | 
  30  |     await expect(
  31  |       page.getByRole('heading', { name: 'Amit' })
  32  |     ).toBeVisible();
  33  | 
  34  |     await expect(
  35  |       page.getByRole('heading', { name: 'Sneha' })
  36  |     ).toBeVisible();
  37  |   });
  38  | 
  39  |   test('shows the correct number of intern cards', async ({ page }) => {
  40  |     // Each intern card has one Remove button.
  41  |     await expect(
  42  |       page.getByRole('button', { name: 'Remove' })
  43  |     ).toHaveCount(4);
  44  |   });
  45  | 
  46  |   // toBeVisible() verifies that an element exists and is visible
  47  |   // to the user. React Testing Library's toBeInTheDocument()
  48  |   // only checks that the element exists in the DOM.
  49  |   test('shows the theme toggle button', async ({ page }) => {
  50  |     await expect(
  51  |       page.getByRole('button', {
  52  |         name: /switch to dark mode/i,
  53  |       })
  54  |     ).toBeVisible();
  55  |   });
  56  | 
  57  | });
  58  | 
  59  | //
  60  | // SECTION 3 — LOCATOR PRACTICE
  61  | //
  62  | test.describe('Locator Practice — getByRole', () => {
  63  | 
  64  |   test.beforeEach(async ({ page }) => {
  65  |     await page.goto('/');
  66  |   });
  67  | 
  68  |   // getByRole is preferred because it uses accessible roles
  69  |   // and names instead of implementation details like CSS selectors.
  70  |   test('finds the Add Intern button by role', async ({ page }) => {
  71  | 
  72  |     const addButton = page.getByRole('button', {
  73  |       name: 'Add Intern',
  74  |     });
  75  | 
  76  |     await expect(addButton).toBeVisible();
  77  |   });
  78  | 
  79  |   test('finds the heading by role', async ({ page }) => {
  80  | 
  81  |     const heading = page.getByRole('heading', {
  82  |       name: 'Intern Dashboard',
  83  |     });
  84  | 
  85  |     await expect(heading).toBeVisible();
  86  |   });
  87  | 
  88  |   test('finds the name input by role', async ({ page }) => {
  89  | 
  90  |     const nameInput = page.getByRole('textbox', {
  91  |       name: 'Intern Name',
  92  |     });
  93  | 
  94  |     await expect(nameInput).toBeVisible();
  95  |   });
  96  | 
  97  |   test('finds the name input by placeholder', async ({ page }) => {
  98  | 
  99  |     const nameInput = page.getByPlaceholder('Intern Name');
  100 | 
  101 |     await expect(nameInput).toBeVisible();
  102 |     await expect(nameInput).toBeEmpty();
  103 |   });
  104 | 
  105 |   test('finds the score input by placeholder', async ({ page }) => {
  106 | 
  107 |     const scoreInput = page.getByPlaceholder('Score');
  108 | 
  109 |     await expect(scoreInput).toBeVisible();
  110 |   });
  111 | 
  112 |   test('finds text with exact matching', async ({ page }) => {
  113 | 
  114 |     await expect(
  115 |       page.getByText('Rahul').first()
  116 |     ).toBeVisible();
  117 |   });
  118 | 
  119 |   test('finds text with regex matching', async ({ page }) => {
  120 | 
  121 |     // Multiple score elements match the regex.
  122 |     // .first() avoids Playwright strict mode violations.
  123 |     await expect(
  124 |       page.getByText(/Score: \d+/).first()
```