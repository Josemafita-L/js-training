# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: page-object.spec.ts >> Journeys via Page Object >> removes an intern by name
- Location: tests\page-object.spec.ts:60:3

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
  2   | import { DashboardPage } from "./pages/DashboardPage";
  3   | 
  4   | test.describe("Journeys via Page Object", () => {
  5   | 
  6   |   let dashboard: DashboardPage;
  7   | 
  8   |   test.beforeEach(async ({ page }) => {
  9   | 
  10  |     dashboard = new DashboardPage(page);
  11  | 
  12  |     await dashboard.goto();
  13  | 
  14  |   });
  15  | 
  16  |   test("adds a new intern", async () => {
  17  | 
  18  |     await dashboard.addIntern(
  19  |       "Vikram",
  20  |       "88",
  21  |       "Backend"
  22  |     );
  23  | 
  24  |     await expect(
  25  |       dashboard.internCard("Vikram")
  26  |     ).toBeVisible();
  27  | 
  28  |     await expect(
  29  |       dashboard.internCount
  30  |     ).toHaveCount(5);
  31  | 
  32  |   });
  33  | 
  34  |   test("searches and filters the list", async () => {
  35  | 
  36  |     await dashboard.search("Rah");
  37  | 
  38  |     await expect(
  39  |   dashboard.page.getByRole("heading", { name: "Rahul" }).first()
  40  | ).toBeVisible();
  41  | 
  42  |     await expect(
  43  |       dashboard.internCard("Rahul")
  44  |     ).toBeVisible();
  45  | 
  46  |   });
  47  | 
  48  |   test("clears search and restores all interns", async () => {
  49  | 
  50  |     await dashboard.search("Rah");
  51  | 
  52  |     await dashboard.clearSearch();
  53  | 
  54  |     await expect(
  55  |       dashboard.internCount
  56  |     ).toHaveCount(4);
  57  | 
  58  |   });
  59  | 
  60  |   test("removes an intern by name", async () => {
  61  | 
  62  |     await dashboard
  63  |       .removeButtonFor("Rahul")
> 64  |       .click();
      |        ^ Error: locator.click: Test timeout of 30000ms exceeded.
  65  | 
  66  |     await expect(
  67  |       dashboard.internCard("Rahul")
  68  |     ).not.toBeVisible();
  69  | 
  70  |     await expect(
  71  |       dashboard.internCount
  72  |     ).toHaveCount(3);
  73  | 
  74  |   });
  75  | 
  76  |   // dashboard.themeToggle is created once in the constructor.
  77  |   // After clicking it, the button text changes to "Switch to Light Mode".
  78  |   // Checking for "Light" confirms the theme switched successfully.
  79  | 
  80  |   test("toggles theme and button label updates", async () => {
  81  | 
  82  |     await dashboard.toggleTheme();
  83  | 
  84  |     await expect(
  85  |       dashboard.themeToggle
  86  |     ).toContainText("Light");
  87  | 
  88  |   });
  89  | 
  90  |   test("shows validation error on empty submit", async () => {
  91  | 
  92  |     await dashboard.addButton.click();
  93  | 
  94  |     await expect(
  95  |       dashboard.validationError()
  96  |     ).toBeVisible();
  97  | 
  98  |   });
  99  | 
  100 | });
  101 | 
  102 | test("chromium-only feature check", async ({
  103 |   page,
  104 |   browserName,
  105 | }) => {
  106 | 
  107 |   test.skip(
  108 |     browserName !== "chromium",
  109 |     "Chromium only"
  110 |   );
  111 | 
  112 |   await page.goto("/");
  113 | 
  114 |   await expect(
  115 |     page.getByText("Intern Dashboard")
  116 |   ).toBeVisible();
  117 | 
  118 | });
  119 | /*
  120 | test.skip(browserName !== "chromium")
  121 | is useful when testing browser-specific APIs
  122 | such as the File System Access API,
  123 | which is not fully supported across all browsers.
  124 | */
```