# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: actions.spec.ts >> removes an intern using Remove button
- Location: tests\actions.spec.ts:44:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByTestId('intern-Rahul').getByRole('button', { name: 'Remove' })

```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test.describe("User Interactions", () => {
  4   | 
  5   |   test.beforeEach(async ({ page }) => {
  6   |     await page.goto("/");
  7   |   });
  8   | 
  9   |   test("adds a new intern using the form", async ({ page }) => {
  10  | 
  11  |     await page.getByPlaceholder("Intern Name").fill("Vikram");
  12  |     await page.getByPlaceholder("Score").fill("85");
  13  | 
  14  |     await page.getByRole("combobox")
  15  |       .selectOption("Backend");
  16  | 
  17  |     await page.getByRole("button", {
  18  |       name: "Add Intern",
  19  |     }).click();
  20  | 
  21  |     await expect(
  22  |       page.getByTestId("intern-Vikram")
  23  |     ).toBeVisible();
  24  | 
  25  |   });
  26  | 
  27  | });
  28  | 
  29  | test("searches interns by name", async ({ page }) => {
  30  | 
  31  |   await page.goto("/");
  32  | 
  33  |   const searchBox =
  34  |     page.getByPlaceholder("Search by name...");
  35  | 
  36  |   await searchBox.fill("Rahul");
  37  | 
  38  |  await expect(
  39  |   page.getByRole("heading", { name: "Rahul" })
  40  | ).toBeVisible();
  41  | 
  42  | });
  43  | 
  44  | test("removes an intern using Remove button", async ({ page }) => {
  45  | 
  46  |   await page.goto("/");
  47  | 
  48  |   const rahulCard =
  49  |     page.getByTestId("intern-Rahul");
  50  | 
  51  |   await rahulCard
  52  |     .getByRole("button", {
  53  |       name: "Remove",
  54  |     })
> 55  |     .click();
      |      ^ Error: locator.click: Test timeout of 30000ms exceeded.
  56  | 
  57  |   await expect(
  58  |     page.getByTestId("intern-Rahul")
  59  |   ).not.toBeVisible();
  60  | 
  61  | });
  62  | 
  63  | test.describe("Actions", () => {
  64  | 
  65  |   test.beforeEach(async ({ page }) => {
  66  |     await page.goto("/");
  67  |   });
  68  | 
  69  |   test("fill sets the input value directly", async ({ page }) => {
  70  | 
  71  |     await page
  72  |       .getByPlaceholder("Intern Name")
  73  |       .fill("Vikram");
  74  | 
  75  |     await expect(
  76  |       page.getByPlaceholder("Intern Name")
  77  |     ).toHaveValue("Vikram");
  78  | 
  79  |   });
  80  | 
  81  |   test("selectOption selects by visible label text", async ({ page }) => {
  82  | 
  83  |     await page
  84  |       .getByRole("combobox")
  85  |       .selectOption({ label: "Backend" });
  86  | 
  87  |     await expect(
  88  |       page.getByRole("combobox")
  89  |     ).toHaveValue("Backend");
  90  | 
  91  |   });
  92  | 
  93  |   test("selectOption selects by value attribute", async ({ page }) => {
  94  | 
  95  |     await page
  96  |       .getByRole("combobox")
  97  |       .selectOption("Frontend");
  98  | 
  99  |     await expect(
  100 |       page.getByRole("combobox")
  101 |     ).toHaveValue("Frontend");
  102 | 
  103 |   });
  104 | 
  105 | });
  106 | 
  107 | // selectOption("Backend") selects using the option value.
  108 | // selectOption({ label: "Backend" }) selects using visible text.
  109 | // Selecting by label is easier to understand when reading tests.
  110 | 
  111 | test.describe("Checkbox Actions", () => {
  112 | 
  113 |   test.beforeEach(async ({ page }) => {
  114 |     await page.goto("/");
  115 |   });
  116 | 
  117 |   test("checkbox is checked by default", async ({ page }) => {
  118 | 
  119 |     const checkbox =
  120 |       page.getByRole("checkbox", {
  121 |         name: "Present",
  122 |       });
  123 | 
  124 |     await expect(checkbox).toBeChecked();
  125 | 
  126 |   });
  127 | 
  128 |   test("uncheck removes the checked state", async ({ page }) => {
  129 | 
  130 |     const checkbox =
  131 |       page.getByRole("checkbox", {
  132 |         name: "Present",
  133 |       });
  134 | 
  135 |     await checkbox.uncheck();
  136 | 
  137 |     await expect(checkbox).not.toBeChecked();
  138 | 
  139 |   });
  140 | 
  141 |   test("check re-applies the checked state", async ({ page }) => {
  142 | 
  143 |     const checkbox =
  144 |       page.getByRole("checkbox", {
  145 |         name: "Present",
  146 |       });
  147 | 
  148 |     await checkbox.uncheck();
  149 | 
  150 |     await checkbox.check();
  151 | 
  152 |     await expect(checkbox).toBeChecked();
  153 | 
  154 |   });
  155 | 
```