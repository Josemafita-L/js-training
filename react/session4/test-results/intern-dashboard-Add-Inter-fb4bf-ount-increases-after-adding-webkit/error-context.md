# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: intern-dashboard.spec.ts >> Add Intern Journey >> intern count increases after adding
- Location: tests\intern-dashboard.spec.ts:235:3

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('button', { name: 'Remove' })
Expected: 4
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for getByRole('button', { name: 'Remove' })
    14 × locator resolved to 0 elements
       - unexpected value "0"

```

# Test source

```ts
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
  217 |     await page.getByPlaceholder('Intern Name').fill('Vikram');
  218 | 
  219 |     await page.getByPlaceholder('Score').clear();
  220 |     await page.getByPlaceholder('Score').fill('88');
  221 | 
  222 |     await page.getByRole('button', {
  223 |       name: 'Add Intern',
  224 |     }).click();
  225 | 
  226 |     await expect(
  227 |       page.getByText('Vikram').first()
  228 |     ).toBeVisible();
  229 | 
  230 |     await expect(
  231 |       page.getByText('Score: 88')
  232 |     ).toBeVisible();
  233 |   });
  234 | 
  235 |   test('intern count increases after adding', async ({ page }) => {
  236 | 
  237 |     await expect(
  238 |       page.getByRole('button', { name: 'Remove' })
> 239 |     ).toHaveCount(4);
      |       ^ Error: expect(locator).toHaveCount(expected) failed
  240 | 
  241 |     await page.getByPlaceholder('Intern Name').fill('Vikram');
  242 | 
  243 |     await page.getByRole('button', {
  244 |       name: 'Add Intern',
  245 |     }).click();
  246 | 
  247 |     await expect(
  248 |       page.getByRole('button', { name: 'Remove' })
  249 |     ).toHaveCount(5);
  250 |   });
  251 | 
  252 |   test('form clears after successful submission', async ({ page }) => {
  253 | 
  254 |     await page.getByPlaceholder('Intern Name').fill('Vikram');
  255 | 
  256 |     await page.getByPlaceholder('Score').clear();
  257 |     await page.getByPlaceholder('Score').fill('88');
  258 | 
  259 |     await page.getByRole('button', {
  260 |       name: 'Add Intern',
  261 |     }).click();
  262 | 
  263 |     await expect(
  264 |       page.getByPlaceholder('Intern Name')
  265 |     ).toHaveValue('');
  266 |   });
  267 | 
  268 |   // Playwright automatically waits for UI updates.
  269 |   // not.toBeVisible() is preferred over queryByText()
  270 |   // because Playwright retries until the element disappears.
  271 |   test('shows validation error when name is empty', async ({ page }) => {
  272 | 
  273 |     await page.getByRole('button', {
  274 |       name: 'Add Intern',
  275 |     }).click();
  276 | 
  277 |     await expect(
  278 |       page.getByText('Name is required')
  279 |     ).toBeVisible();
  280 |   });
  281 | 
  282 |   test('does not add intern when form is invalid', async ({ page }) => {
  283 | 
  284 |     await page.getByRole('button', {
  285 |       name: 'Add Intern',
  286 |     }).click();
  287 | 
  288 |     await expect(
  289 |       page.getByRole('button', {
  290 |         name: 'Remove',
  291 |       })
  292 |     ).toHaveCount(4);
  293 |   });
  294 | 
  295 |   test('validation error disappears after name is entered', async ({ page }) => {
  296 | 
  297 |     await page.getByRole('button', {
  298 |       name: 'Add Intern',
  299 |     }).click();
  300 | 
  301 |     await expect(
  302 |       page.getByText('Name is required')
  303 |     ).toBeVisible();
  304 | 
  305 |     await page.getByPlaceholder('Intern Name').fill('Vikram');
  306 | 
  307 |     await expect(
  308 |       page.getByText('Name is required')
  309 |     ).not.toBeVisible();
  310 |   });
  311 | 
  312 | });
  313 | 
  314 | //
  315 | // SECTION 5 — REMOVE INTERN JOURNEY
  316 | //
  317 | test.describe('Remove Intern Journey', () => {
  318 | 
  319 |   test.beforeEach(async ({ page }) => {
  320 |     await page.goto('/');
  321 |   });
  322 | 
  323 |   // locator.filter() could also be used to scope the Rahul card.
  324 |   // Example:
  325 |   //
  326 |   // const rahulCard = page.locator('div').filter({
  327 |   //   has: page.getByRole('heading', { name: 'Rahul' }),
  328 |   // });
  329 |   //
  330 |   // await rahulCard.getByRole('button', { name: 'Remove' }).click();
  331 | 
  332 |   test('removes an intern when Remove is clicked', async ({ page }) => {
  333 | 
  334 |     await expect(
  335 |       page.getByRole('heading', {
  336 |         name: 'Rahul',
  337 |       })
  338 |     ).toBeVisible();
  339 | 
```