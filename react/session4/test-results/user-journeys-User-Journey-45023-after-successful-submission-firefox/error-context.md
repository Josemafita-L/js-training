# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user-journeys.spec.ts >> User Journey - Add Intern >> form resets after successful submission
- Location: tests\user-journeys.spec.ts:48:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByPlaceholder('Intern Name')

```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test.describe("User Journey - Add Intern", () => {
  4   | 
  5   |   test.beforeEach(async ({ page }) => {
  6   |     await page.goto("/");
  7   |   });
  8   | 
  9   |   // This journey test verifies that the complete application works
  10  |   // together (form + context + intern list). Unlike a Vitest unit
  11  |   // test, it confirms that a real user can add an intern and see
  12  |   // the new intern appear in the UI.
  13  | 
  14  |   test("user fills the form and the new intern appears in the list", async ({ page }) => {
  15  | 
  16  |     // Initially there are 4 Remove buttons
  17  |     await expect(
  18  |       page.getByRole("button", { name: "Remove" })
  19  |     ).toHaveCount(4);
  20  | 
  21  |     // Fill the form
  22  |     await page.getByPlaceholder("Intern Name").fill("Vikram");
  23  | 
  24  |     await page.getByPlaceholder("Score").clear();
  25  | 
  26  |     await page.getByPlaceholder("Score").fill("88");
  27  | 
  28  |     await page.getByRole("combobox")
  29  |       .selectOption("Frontend");
  30  | 
  31  |     // Submit
  32  |     await page.getByRole("button", {
  33  |       name: "Add Intern",
  34  |     }).click();
  35  | 
  36  |     // Verify Vikram appears
  37  |     await expect(
  38  |       page.getByTestId("intern-Vikram")
  39  |     ).toBeVisible();
  40  | 
  41  |     // Remove buttons become 5
  42  |     await expect(
  43  |       page.getByRole("button", { name: "Remove" })
  44  |     ).toHaveCount(5);
  45  | 
  46  |   });
  47  | 
  48  |   test("form resets after successful submission", async ({ page }) => {
  49  | 
  50  |     await page.getByPlaceholder("Intern Name")
> 51  |       .fill("Vikram");
      |        ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  52  | 
  53  |     await page.getByPlaceholder("Score")
  54  |       .fill("88");
  55  | 
  56  |     await page.getByRole("button", {
  57  |       name: "Add Intern",
  58  |     }).click();
  59  | 
  60  |     await expect(
  61  |       page.getByPlaceholder("Intern Name")
  62  |     ).toHaveValue("");
  63  | 
  64  |   });
  65  | 
  66  | });
  67  | 
  68  | test.describe("User Journey - Add Intern Validation", () => {
  69  | 
  70  |   test.beforeEach(async ({ page }) => {
  71  |     await page.goto("/");
  72  |   });
  73  | 
  74  |   test("shows error when submitting with empty name", async ({ page }) => {
  75  | 
  76  |     await page.getByRole("button", {
  77  |       name: "Add Intern",
  78  |     }).click();
  79  | 
  80  |     await expect(
  81  |       page.getByText("Name is required")
  82  |     ).toBeVisible();
  83  | 
  84  |   });
  85  | 
  86  |   test("does not add intern when name is empty", async ({ page }) => {
  87  | 
  88  |     await expect(
  89  |       page.getByRole("button", { name: "Remove" })
  90  |     ).toHaveCount(4);
  91  | 
  92  |     await page.getByRole("button", {
  93  |       name: "Add Intern",
  94  |     }).click();
  95  | 
  96  |     await expect(
  97  |       page.getByRole("button", { name: "Remove" })
  98  |     ).toHaveCount(4);
  99  | 
  100 |   });
  101 | 
  102 |   test("error clears after entering a valid name and submitting", async ({ page }) => {
  103 | 
  104 |     // Trigger validation error
  105 |     await page.getByRole("button", {
  106 |       name: "Add Intern",
  107 |     }).click();
  108 | 
  109 |     await expect(
  110 |       page.getByText("Name is required")
  111 |     ).toBeVisible();
  112 | 
  113 |     // Enter valid data
  114 |     await page.getByPlaceholder("Intern Name")
  115 |       .fill("Vikram");
  116 | 
  117 |     await page.getByPlaceholder("Score")
  118 |       .fill("88");
  119 | 
  120 |     await page.getByRole("button", {
  121 |       name: "Add Intern",
  122 |     }).click();
  123 | 
  124 |     // Error disappears
  125 |     await expect(
  126 |       page.getByText("Name is required")
  127 |     ).not.toBeVisible();
  128 | 
  129 |   });
  130 | 
  131 | });
  132 | 
  133 | test.describe("User Journey - Search and Filter", () => {
  134 | 
  135 |   test.beforeEach(async ({ page }) => {
  136 |     await page.goto("/");
  137 |   });
  138 | 
  139 |   test("typing in search filters interns", async ({ page }) => {
  140 | 
  141 |     const searchBox =
  142 |       page.getByPlaceholder("Search by name...");
  143 | 
  144 |     await searchBox.fill("Rah");
  145 | 
  146 |     await expect(
  147 |       page.getByRole("heading", { name: "Rahul" })
  148 |     ).toBeVisible();
  149 |     /*
  150 | The Playwright Inspector showed each step of the test,
  151 | highlighted the locator being searched,
```