import { test, expect } from "@playwright/test";

test.describe("User Interactions", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("adds a new intern using the form", async ({ page }) => {

    await page.getByPlaceholder("Intern Name").fill("Vikram");
    await page.getByPlaceholder("Score").fill("85");

    await page.getByRole("combobox")
      .selectOption("Backend");

    await page.getByRole("button", {
      name: "Add Intern",
    }).click();

    await expect(
      page.getByTestId("intern-Vikram")
    ).toBeVisible();

  });

});

test("searches interns by name", async ({ page }) => {

  await page.goto("/");

  const searchBox =
    page.getByPlaceholder("Search by name...");

  await searchBox.fill("Rahul");

 await expect(
  page.getByRole("heading", { name: "Rahul" })
).toBeVisible();

});

test("removes an intern using Remove button", async ({ page }) => {

  await page.goto("/");

  const rahulCard =
    page.getByTestId("intern-Rahul");

  await rahulCard
    .getByRole("button", {
      name: "Remove",
    })
    .click();

  await expect(
    page.getByTestId("intern-Rahul")
  ).not.toBeVisible();

});

test.describe("Actions", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("fill sets the input value directly", async ({ page }) => {

    await page
      .getByPlaceholder("Intern Name")
      .fill("Vikram");

    await expect(
      page.getByPlaceholder("Intern Name")
    ).toHaveValue("Vikram");

  });

  test("selectOption selects by visible label text", async ({ page }) => {

    await page
      .getByRole("combobox")
      .selectOption({ label: "Backend" });

    await expect(
      page.getByRole("combobox")
    ).toHaveValue("Backend");

  });

  test("selectOption selects by value attribute", async ({ page }) => {

    await page
      .getByRole("combobox")
      .selectOption("Frontend");

    await expect(
      page.getByRole("combobox")
    ).toHaveValue("Frontend");

  });

});

// selectOption("Backend") selects using the option value.
// selectOption({ label: "Backend" }) selects using visible text.
// Selecting by label is easier to understand when reading tests.

test.describe("Checkbox Actions", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("checkbox is checked by default", async ({ page }) => {

    const checkbox =
      page.getByRole("checkbox", {
        name: "Present",
      });

    await expect(checkbox).toBeChecked();

  });

  test("uncheck removes the checked state", async ({ page }) => {

    const checkbox =
      page.getByRole("checkbox", {
        name: "Present",
      });

    await checkbox.uncheck();

    await expect(checkbox).not.toBeChecked();

  });

  test("check re-applies the checked state", async ({ page }) => {

    const checkbox =
      page.getByRole("checkbox", {
        name: "Present",
      });

    await checkbox.uncheck();

    await checkbox.check();

    await expect(checkbox).toBeChecked();

  });

});

// check() only checks when necessary.
// click() toggles the checkbox and may uncheck an already checked box.

test.describe("Keyboard Actions", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Tab moves focus from name input to score input", async ({ page }) => {

    const nameInput =
      page.getByPlaceholder("Intern Name");

    const scoreInput =
      page.getByPlaceholder("Score");

    await nameInput.focus();

    await expect(nameInput).toBeFocused();

    await page.keyboard.press("Tab");

    await expect(scoreInput).toBeFocused();

  });

});

// locator.press() sends keys to one locator.
// page.keyboard.press() sends keys to the focused element.

test.describe("Clear and Type", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("clear empties the score input", async ({ page }) => {

    const score =
      page.getByPlaceholder("Score");

    await score.fill("92");

    await score.clear();

    await expect(score).toHaveValue("0");

  });

});

// fill() replaces the entire value.
// type() enters one character at a time.
// type() is useful for search boxes and autocomplete.

test("type enters characters one by one", async ({ page }) => {

  await page.goto("/");

  const searchBox =
    page.getByPlaceholder("Search by name...");

  await searchBox.type("Rah");

await expect(
  page.getByRole("heading", { name: "Rahul" })
).toBeVisible();

});
test.describe("Visual Testing", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("intern dashboard matches the baseline screenshot", async ({ page }) => {

    await expect(page).toHaveScreenshot("intern-dashboard.png");

  });

});
// Findings:
//
// First run:
// The test failed because no baseline screenshot existed.
// Playwright captured the current page as the actual screenshot.
//
// After running with --update-snapshots:
// A baseline screenshot was created.
//
// Second run:
// Playwright compared the current page with the baseline,
// and the test passed because both screenshots matched.
//
// After changing visible text:
// The screenshot no longer matched the baseline,
// so Playwright failed the test and generated diff images
// showing the visual changes.