# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: intern-dashboard.spec.ts >> Locator Practice — getByRole >> finds text with exact matching
- Location: tests\intern-dashboard.spec.ts:112:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Rahul').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Rahul').first()

```

# Test source

```ts
  16  |     await expect(
  17  | page.getByRole('heading', { name: 'Intern Dashboard' })
  18  | ).toBeVisible();
  19  |   });
  20  | 
  21  |   test('shows the initial intern names', async ({ page }) => {
  22  |     await expect(
  23  |       page.getByRole('heading', { name: 'Rahul' })
  24  |     ).toBeVisible();
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
> 116 |     ).toBeVisible();
      |       ^ Error: expect(locator).toBeVisible() failed
  117 |   });
  118 | 
  119 |   test('finds text with regex matching', async ({ page }) => {
  120 | 
  121 |     // Multiple score elements match the regex.
  122 |     // .first() avoids Playwright strict mode violations.
  123 |     await expect(
  124 |       page.getByText(/Score: \d+/).first()
  125 |     ).toBeVisible();
  126 |   });
  127 | 
  128 |   test('asserts that an absent element is not visible', async ({ page }) => {
  129 | 
  130 |     await expect(
  131 |       page.getByText('Placeholder')
  132 |     ).not.toBeVisible();
  133 |   });
  134 | 
  135 | });
  136 | 
  137 | //
  138 | // SECTION 4 — ASSERTIONS
  139 | //
  140 | test.describe('Assertions', () => {
  141 | 
  142 |   test.beforeEach(async ({ page }) => {
  143 |     await page.goto('/');
  144 |   });
  145 | 
  146 |   // toHaveText() checks for an exact text match.
  147 |   // toContainText() only checks that the expected
  148 |   // text appears somewhere inside the element.
  149 |   test('heading has the correct text', async ({ page }) => {
  150 | 
  151 |     await expect(
  152 |       page.getByRole('heading', {
  153 |         name: 'Intern Dashboard',
  154 |       })
  155 |     ).toHaveText('Intern Dashboard');
  156 |   });
  157 | 
  158 |   test('theme toggle button contains the word "Dark"', async ({ page }) => {
  159 | 
  160 |     await expect(
  161 |       page.getByRole('button', {
  162 |         name: /switch to dark mode/i,
  163 |       })
  164 |     ).toContainText('Dark');
  165 |   });
  166 | 
  167 |   test('error message is not visible initially', async ({ page }) => {
  168 | 
  169 |     await expect(
  170 |       page.getByText('Name is required')
  171 |     ).not.toBeVisible();
  172 |   });
  173 | 
  174 |   test('name input is empty initially', async ({ page }) => {
  175 | 
  176 |     await expect(
  177 |       page.getByPlaceholder('Intern Name')
  178 |     ).toHaveValue('');
  179 |   });
  180 | 
  181 |   test('score input is 0 initially', async ({ page }) => {
  182 | 
  183 |     await expect(
  184 |       page.getByPlaceholder('Score')
  185 |     ).toHaveValue('0');
  186 |   });
  187 | 
  188 |   test('correct number of Remove buttons matches the intern count', async ({ page }) => {
  189 | 
  190 |     await expect(
  191 |       page.getByRole('button', {
  192 |         name: 'Remove',
  193 |       })
  194 |     ).toHaveCount(4);
  195 |   });
  196 | 
  197 |   // Observation:
  198 |   // If toHaveCount(5) is used instead of toHaveCount(4),
  199 |   // Playwright retries automatically for about 5 seconds
  200 |   // before reporting the assertion failure.
  201 | 
  202 | });
  203 | //
  204 | // SECTION 5 — ADD INTERN JOURNEY
  205 | //
  206 | test.describe('Add Intern Journey', () => {
  207 | 
  208 |   test.beforeEach(async ({ page }) => {
  209 |     await page.goto('/');
  210 |   });
  211 | 
  212 |   // Unlike a unit test, this verifies the complete end-to-end flow:
  213 |   // filling the real form, clicking the real button, updating state,
  214 |   // and rendering the new intern in the browser.
  215 |   test('adds a new intern and shows them in the list', async ({ page }) => {
  216 | 
```