import { test, expect } from '@playwright/test';

test.describe('Locator Chaining and Filtering', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test("finds Rahul's Remove button using filter", async ({ page }) => {

   const rahulCard = page.getByTestId("intern-Rahul");

    const removeButton =
      rahulCard.getByRole("button", {
        name: "Remove",
      });

    await expect(removeButton).toBeVisible();

  });

  test("finds Priya's score using filter and chaining", async ({ page }) => {

   const priyaCard = page.getByTestId("intern-Priya");

    await expect(priyaCard).toContainText("78");

  });

  // filter({ hasText: 'Priya' }) is safer than nth(1)
  // because it searches for the intern by name.
  // Even if the order of interns changes,
  // it will still find Priya.
  //
  // nth(1) always selects the second matching element.
  // If another intern is inserted before Priya,
  // nth(1) will point to a different intern.

});
test.describe('Scoped Locators', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test("asserts score and Remove button inside Rahul's card only", async ({ page }) => {

    // Find Rahul's card by filtering on the container
    const rahulCard = page.getByTestId("intern-Rahul");

    // All assertions are scoped to Rahul's card
    await expect(rahulCard).toContainText("92");

    await expect(
      rahulCard.getByRole("button", {
        name: "Remove",
      })
    ).toBeVisible();

  });

  test("asserts different data in two different cards", async ({ page }) => {

    const rahulCard = page.getByTestId("intern-Rahul");
const amitCard = page.getByTestId("intern-Amit");

    await expect(rahulCard).toContainText("92");

    await expect(amitCard).toContainText("45");

  });

});
// Scoped locators search only inside a specific card or container.
//
// This prevents Playwright from accidentally matching
// similar elements elsewhere on the page.
//
// It makes tests more reliable when multiple cards,
// lists or repeated UI components contain the same text.

test("fills the form using scoped locators", async ({ page }) => {
  await page.goto("/");

  const form = page.getByTestId("add-intern-form");

  await form.getByPlaceholder("Intern Name").fill("Vikram");
  await form.getByPlaceholder("Score").fill("75");
  await form.getByRole("combobox").selectOption("Backend");
  await form.getByLabel("Present").check();

  await form.getByRole("button", { name: "Add Intern" }).click();

  await expect(page.getByText("Vikram")).toBeVisible();
});

// Scoping locators to a form prevents Playwright
// from interacting with the wrong input fields when
// multiple forms have similar controls.
//
// It also avoids false-positive tests when buttons
// or inputs with the same labels exist elsewhere.