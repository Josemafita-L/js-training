import { test, expect } from "@playwright/test";


test.describe("User Interactions", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });


  test("adds a new intern using the form", async ({ page }) => {

    // Locate input fields
    const nameInput = page.getPlaceholder("Intern Name");
    const scoreInput = page.getPlaceholder("Score");

    await nameInput.fill("Vikram");

    await scoreInput.fill("85");


    // Select role
    await page.getByRole("combobox")
      .selectOption("Backend");


    // Submit form
    await page.getByRole("button", {
      name: "Add Intern"
    }).click();


    // Verify new intern appears
    await expect(
      page.getByText("Vikram")
    ).toBeVisible();

  });

});
test("searches interns by name", async ({ page }) => {

  const searchBox =
    page.getByPlaceholder("Search by name...");


  await searchBox.fill("Rahul");


  await expect(
    page.getByText("Rahul")
  ).toBeVisible();


  await expect(
    page.getByText("Priya")
  ).not.toBeVisible();

});
test("removes an intern using Remove button", async ({ page }) => {

  const rahulCard =
    page.getByTestId("intern-Rahul");


  await rahulCard
    .getByRole("button", {
      name:"Remove"
    })
    .click();


  await expect(
    page.getByText("Rahul")
  ).not.toBeVisible();

});
test.describe("Actions", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("fill sets the input value directly", async ({ page }) => {

    await page.getByPlaceholder("Intern Name").fill("Vikram");

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
// selectOption("Backend") selects using the option's value.
//
// selectOption({ label: "Backend" }) selects using the text
// shown to the user.
//
// Selecting by label is easier to read,
// while selecting by value is useful when
// the displayed text may change.
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
// check() only checks the checkbox if needed.
//
// click() simply toggles the checkbox.
//
// If the checkbox is already checked,
// click() would accidentally uncheck it.
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
// locator.press("Tab") sends the key to a specific element.
//
// page.keyboard.press("Tab") sends the key to whichever
// element currently has keyboard focus.
test.describe("Clear and Type", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("clear empties the score input", async ({ page }) => {

    const score =
      page.getByPlaceholder("Score");

    await score.fill("92");

    await score.clear();

    await expect(score).toHaveValue("");

  });

});
// fill() replaces the entire value at once.
//
// type() enters one character at a time.
//
// type() is useful for live search,
// autocomplete and inputs that react
// after every key press.