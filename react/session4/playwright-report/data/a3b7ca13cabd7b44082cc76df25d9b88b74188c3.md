# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: intern-dashboard.spec.ts >> Remove Intern Journey >> intern count decreases after removal
- Location: tests\intern-dashboard.spec.ts:354:3

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
  340 |     await page
  341 |       .getByRole('button', {
  342 |         name: 'Remove',
  343 |       })
  344 |       .first()
  345 |       .click();
  346 | 
  347 |     await expect(
  348 |       page.getByRole('heading', {
  349 |         name: 'Rahul',
  350 |       })
  351 |     ).not.toBeVisible();
  352 |   });
  353 | 
  354 |   test('intern count decreases after removal', async ({ page }) => {
  355 | 
  356 |     await expect(
  357 |       page.getByRole('button', {
  358 |         name: 'Remove',
  359 |       })
> 360 |     ).toHaveCount(4);
      |       ^ Error: expect(locator).toHaveCount(expected) failed
  361 | 
  362 |     await page
  363 |       .getByRole('button', {
  364 |         name: 'Remove',
  365 |       })
  366 |       .first()
  367 |       .click();
  368 | 
  369 |     await expect(
  370 |       page.getByRole('button', {
  371 |         name: 'Remove',
  372 |       })
  373 |     ).toHaveCount(3);
  374 |   });
  375 | 
  376 | });
  377 | 
  378 | //
  379 | // SECTION 5 — THEME TOGGLE JOURNEY
  380 | //
  381 | test.describe('Theme Toggle Journey', () => {
  382 | 
  383 |   test.beforeEach(async ({ page }) => {
  384 |     await page.goto('/');
  385 |   });
  386 | 
  387 |   // Unlike a unit test, Playwright verifies the real browser
  388 |   // interaction and confirms that the visible UI changes after
  389 |   // clicking the button.
  390 |   test('toggle button label changes from Dark to Light after click', async ({ page }) => {
  391 | 
  392 |     await expect(
  393 |       page.getByRole('button', {
  394 |         name: /switch to dark mode/i,
  395 |       })
  396 |     ).toBeVisible();
  397 | 
  398 |     await page
  399 |       .getByRole('button', {
  400 |         name: /switch to dark mode/i,
  401 |       })
  402 |       .click();
  403 | 
  404 |     await expect(
  405 |       page.getByRole('button', {
  406 |         name: /switch to light mode/i,
  407 |       })
  408 |     ).toBeVisible();
  409 |   });
  410 | 
  411 |   test('toggle switches back on second click', async ({ page }) => {
  412 | 
  413 |     await page
  414 |       .getByRole('button', {
  415 |         name: /switch to dark mode/i,
  416 |       })
  417 |       .click();
  418 | 
  419 |     await page
  420 |       .getByRole('button', {
  421 |         name: /switch to light mode/i,
  422 |       })
  423 |       .click();
  424 | 
  425 |     await expect(
  426 |       page.getByRole('button', {
  427 |         name: /switch to dark mode/i,
  428 |       })
  429 |     ).toBeVisible();
  430 |   });
  431 | 
  432 | });
  433 | 
  434 | //
  435 | // SECTION 6 — OBSERVATIONS
  436 | //
  437 | 
  438 | // UI Mode Observation:
  439 | // Playwright UI mode displays every action in sequence,
  440 | // highlights locators on the page, and allows stepping
  441 | // through the test interactively.
  442 | 
  443 | // Headless vs Headed:
  444 | // Headless mode runs without opening a browser and is
  445 | // faster for CI and automated execution.
  446 | // Headed mode opens the browser window, making it useful
  447 | // for debugging and watching interactions happen visually.
  448 | 
  449 | //
  450 | // SECTION 7 — HTML REPORT & TRACE VIEWER
  451 | //
  452 | 
  453 | // HTML Report Observation:
  454 | // The HTML report provides screenshots, execution timeline,
  455 | // stack trace, and detailed assertion failures that are not
  456 | // available directly in the terminal output.
  457 | 
  458 | // Trace Viewer Notes:
  459 | //
  460 | // 1. Timeline
```