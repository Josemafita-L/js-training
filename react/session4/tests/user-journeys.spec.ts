import { test, expect } from "@playwright/test";

test.describe("User Journey - Add Intern", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // This journey test verifies that the complete application works
  // together (form + context + intern list). Unlike a Vitest unit
  // test, it confirms that a real user can add an intern and see
  // the new intern appear in the UI.

  test("user fills the form and the new intern appears in the list", async ({ page }) => {

    // Initially there are 4 Remove buttons
    await expect(
      page.getByRole("button", { name: "Remove" })
    ).toHaveCount(4);

    // Fill the form
    await page.getByPlaceholder("Intern Name").fill("Vikram");

    await page.getByPlaceholder("Score").clear();

    await page.getByPlaceholder("Score").fill("88");

    await page.getByRole("combobox")
      .selectOption("Frontend");

    // Submit
    await page.getByRole("button", {
      name: "Add Intern",
    }).click();

    // Verify Vikram appears
    await expect(
      page.getByTestId("intern-Vikram")
    ).toBeVisible();

    // Remove buttons become 5
    await expect(
      page.getByRole("button", { name: "Remove" })
    ).toHaveCount(5);

  });

  test("form resets after successful submission", async ({ page }) => {

    await page.getByPlaceholder("Intern Name")
      .fill("Vikram");

    await page.getByPlaceholder("Score")
      .fill("88");

    await page.getByRole("button", {
      name: "Add Intern",
    }).click();

    await expect(
      page.getByPlaceholder("Intern Name")
    ).toHaveValue("");

  });

});

test.describe("User Journey - Add Intern Validation", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows error when submitting with empty name", async ({ page }) => {

    await page.getByRole("button", {
      name: "Add Intern",
    }).click();

    await expect(
      page.getByText("Name is required")
    ).toBeVisible();

  });

  test("does not add intern when name is empty", async ({ page }) => {

    await expect(
      page.getByRole("button", { name: "Remove" })
    ).toHaveCount(4);

    await page.getByRole("button", {
      name: "Add Intern",
    }).click();

    await expect(
      page.getByRole("button", { name: "Remove" })
    ).toHaveCount(4);

  });

  test("error clears after entering a valid name and submitting", async ({ page }) => {

    // Trigger validation error
    await page.getByRole("button", {
      name: "Add Intern",
    }).click();

    await expect(
      page.getByText("Name is required")
    ).toBeVisible();

    // Enter valid data
    await page.getByPlaceholder("Intern Name")
      .fill("Vikram");

    await page.getByPlaceholder("Score")
      .fill("88");

    await page.getByRole("button", {
      name: "Add Intern",
    }).click();

    // Error disappears
    await expect(
      page.getByText("Name is required")
    ).not.toBeVisible();

  });

});

test.describe("User Journey - Search and Filter", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("typing in search filters interns", async ({ page }) => {

    const searchBox =
      page.getByPlaceholder("Search by name...");

    await searchBox.fill("Rah");

    await expect(
      page.getByRole("heading", { name: "Rahul" })
    ).toBeVisible();
    /*
The Playwright Inspector showed each step of the test,
highlighted the locator being searched,
and displayed that no matching element existed.
This is easier than reading only the terminal error because
I can inspect the page visually while the test is paused.
*/

    await expect(
      page.getByRole("heading", { name: "Priya" })
    ).not.toBeVisible();

  });

  test("clearing search restores all interns", async ({ page }) => {

    const searchBox =
      page.getByPlaceholder("Search by name...");

    await searchBox.fill("Rah");

    await searchBox.clear();

    await expect(
      page.getByRole("heading", { name: "Rahul" })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Priya" })
    ).toBeVisible();

  });

  test("search is case insensitive", async ({ page }) => {

    const searchBox =
      page.getByPlaceholder("Search by name...");

    await searchBox.fill("rahul");

    await expect(
      page.getByRole("heading", { name: "Rahul" })
    ).toBeVisible();

  });

  test("shows empty state when no intern matches", async ({ page }) => {

    const searchBox =
      page.getByPlaceholder("Search by name...");

    await searchBox.fill("zzz");

    await expect(
      page.getByText("No Intern Found")
    ).toBeVisible();

  });

});

// type() enters text one character at a time,
// just like a real user typing.
//
// It triggers keyboard events for every character,
// making it ideal for live search and autocomplete.
//
// fill() replaces the entire value at once,
// while type() better simulates real user behaviour.

test.describe("User Journey - Remove Intern", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("clicking Remove removes Rahul from the list", async ({ page }) => {

    const rahulCard =
      page.getByTestId("intern-Rahul");

    await expect(rahulCard).toBeVisible();

    await rahulCard
      .getByRole("button", { name: "Remove" })
      .click();

    await expect(rahulCard).not.toBeVisible();

  });

  test("intern count decreases after removal", async ({ page }) => {

    await expect(
      page.getByRole("button", { name: "Remove" })
    ).toHaveCount(4);

    await page
      .getByTestId("intern-Rahul")
      .getByRole("button", { name: "Remove" })
      .click();

    await expect(
      page.getByRole("button", { name: "Remove" })
    ).toHaveCount(3);

  });

  test("other interns remain after Rahul is removed", async ({ page }) => {

    await page
      .getByTestId("intern-Rahul")
      .getByRole("button", { name: "Remove" })
      .click();

    await expect(
      page.getByTestId("intern-Priya")
    ).toBeVisible();

    await expect(
      page.getByTestId("intern-Amit")
    ).toBeVisible();

    await expect(
      page.getByTestId("intern-Sneha")
    ).toBeVisible();

  });

});
// Using a scoped locator (or data-testid) ensures that the
// Remove button belongs to the correct intern card.
//
// Using .first() is unreliable because if the order of interns
// changes, it may click the Remove button of a different intern,
// causing incorrect test results.

test.describe("User Journey — Theme Toggle", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("toggle button shows Switch to Dark Mode initially", async ({ page }) => {

    await expect(
      page.getByRole("button", {
        name: /switch to dark mode/i,
      })
    ).toBeVisible();

  });

  test("clicking toggle changes button to Switch to Light Mode", async ({ page }) => {

    await page
      .getByRole("button", {
        name: /switch to dark mode/i,
      })
      .click();

    await expect(
      page.getByRole("button", {
        name: /switch to light mode/i,
      })
    ).toBeVisible();

  });

  test("clicking toggle again changes back to Switch to Dark Mode", async ({ page }) => {

    await page
      .getByRole("button", {
        name: /switch to dark mode/i,
      })
      .click();

    await page
      .getByRole("button", {
        name: /switch to light mode/i,
      })
      .click();

    await expect(
      page.getByRole("button", {
        name: /switch to dark mode/i,
      })
    ).toBeVisible();

  });

});

// We verify the button label because this application changes
// the button text when the theme changes.
//
// If the application instead added a CSS class such as
// "dark" to the body or root element, we would verify that
// class instead of only checking the button text, since that
// would confirm the actual theme was applied.