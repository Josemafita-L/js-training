import { test, expect } from '@playwright/test';


/*
=====================================================
Self Learning 1

page.fill() vs page.type()
=====================================================

page.fill()

- Clears existing text before entering.
- Faster because it sets value directly.
- Preferred for normal form inputs.

page.type()

- Types characters one by one.
- Simulates keyboard typing.
- Useful when testing keyboard events,
  autocomplete, debounce, etc.

*/


test.describe('Self Learning - fill vs type', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });


  test('demonstrates page.fill()', async ({ page }) => {

    // Using exact placeholder to avoid matching Search input
    const input = page.getByPlaceholder('Intern Name');

    await input.fill('Vikram');

    await expect(input).toHaveValue('Vikram');

  });



  test('demonstrates page.type()', async ({ page }) => {

    const input = page.getByPlaceholder('Intern Name');

    await input.click();

    await page.keyboard.type('Vikram');

    await expect(input).toHaveValue('Vikram');

  });

});





/*
=====================================================
Self Learning 2

page.keyboard.press()
=====================================================

keyboard.press('Tab')

moves keyboard focus to the next
focusable element.

This helps test keyboard navigation.
*/


test.describe('Keyboard Navigation', () => {


  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });



  test('Tab moves focus to the score input', async ({ page }) => {


    const nameInput =
      page.getByPlaceholder('Intern Name');


    const scoreInput =
      page.getByPlaceholder('Score');


    await nameInput.click();


    await page.keyboard.type('Vikram');


    await page.keyboard.press('Tab');


    await expect(scoreInput).toBeFocused();

  });


});







/*
=====================================================
Self Learning 3

page.screenshot()
=====================================================

page.screenshot()

- Captures the current browser page.
- Useful for debugging failures.
- Helps document UI states.

*/


test.describe('Screenshot', () => {


  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });



  test('takes a screenshot', async ({ page }) => {


    await page.screenshot({
      path: 'playwright-screenshot.png',
    });


    // Screenshot file will be created
    // in the project root after running test.

  });


});







/*
=====================================================
Self Learning 4

test.only() vs test.skip()
=====================================================


test.only()

- Runs only selected test.
- Useful while debugging.
- Must be removed before committing.


test.skip()

- Skips a test.
- Useful for unfinished or temporarily
  disabled tests.


*/


test.describe('only and skip research', () => {



  test('simple passing test', async ({ page }) => {


    await page.goto('/');


    await expect(
      page.getByRole('heading', {
        name: 'Intern Dashboard',
      })
    ).toBeVisible();


  });



});
