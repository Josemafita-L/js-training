# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: locators-actions.spec.ts >> Scoped Locators >> asserts different data in two different cards
- Location: tests\locators-actions.spec.ts:62:3

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('intern-Rahul')
Expected substring: "92"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for getByTestId('intern-Rahul')

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Locator Chaining and Filtering', () => {
  4   | 
  5   |   test.beforeEach(async ({ page }) => {
  6   |     await page.goto('/');
  7   |   });
  8   | 
  9   |   test("finds Rahul's Remove button using filter", async ({ page }) => {
  10  | 
  11  |    const rahulCard = page.getByTestId("intern-Rahul");
  12  | 
  13  |     const removeButton =
  14  |       rahulCard.getByRole("button", {
  15  |         name: "Remove",
  16  |       });
  17  | 
  18  |     await expect(removeButton).toBeVisible();
  19  | 
  20  |   });
  21  | 
  22  |   test("finds Priya's score using filter and chaining", async ({ page }) => {
  23  | 
  24  |    const priyaCard = page.getByTestId("intern-Priya");
  25  | 
  26  |     await expect(priyaCard).toContainText("78");
  27  | 
  28  |   });
  29  | 
  30  |   // filter({ hasText: 'Priya' }) is safer than nth(1)
  31  |   // because it searches for the intern by name.
  32  |   // Even if the order of interns changes,
  33  |   // it will still find Priya.
  34  |   //
  35  |   // nth(1) always selects the second matching element.
  36  |   // If another intern is inserted before Priya,
  37  |   // nth(1) will point to a different intern.
  38  | 
  39  | });
  40  | test.describe('Scoped Locators', () => {
  41  | 
  42  |   test.beforeEach(async ({ page }) => {
  43  |     await page.goto('/');
  44  |   });
  45  | 
  46  |   test("asserts score and Remove button inside Rahul's card only", async ({ page }) => {
  47  | 
  48  |     // Find Rahul's card by filtering on the container
  49  |     const rahulCard = page.getByTestId("intern-Rahul");
  50  | 
  51  |     // All assertions are scoped to Rahul's card
  52  |     await expect(rahulCard).toContainText("92");
  53  | 
  54  |     await expect(
  55  |       rahulCard.getByRole("button", {
  56  |         name: "Remove",
  57  |       })
  58  |     ).toBeVisible();
  59  | 
  60  |   });
  61  | 
  62  |   test("asserts different data in two different cards", async ({ page }) => {
  63  | 
  64  |     const rahulCard = page.getByTestId("intern-Rahul");
  65  | const amitCard = page.getByTestId("intern-Amit");
  66  | 
> 67  |     await expect(rahulCard).toContainText("92");
      |                             ^ Error: expect(locator).toContainText(expected) failed
  68  | 
  69  |     await expect(amitCard).toContainText("45");
  70  | 
  71  |   });
  72  | 
  73  | });
  74  | // Scoped locators search only inside a specific card or container.
  75  | //
  76  | // This prevents Playwright from accidentally matching
  77  | // similar elements elsewhere on the page.
  78  | //
  79  | // It makes tests more reliable when multiple cards,
  80  | // lists or repeated UI components contain the same text.
  81  | 
  82  | test("fills the form using scoped locators", async ({ page }) => {
  83  |   await page.goto("/");
  84  | 
  85  |   const form = page.getByTestId("add-intern-form");
  86  | 
  87  |   await form.getByPlaceholder("Intern Name").fill("Vikram");
  88  |   await form.getByPlaceholder("Score").fill("75");
  89  |   await form.getByRole("combobox").selectOption("Backend");
  90  |   await form.getByLabel("Present").check();
  91  | 
  92  |   await form.getByRole("button", { name: "Add Intern" }).click();
  93  | await expect(
  94  |   page.getByRole("heading", { name: "Vikram" })
  95  | ).toBeVisible();
  96  |   
  97  | });
  98  | 
  99  | // Scoping locators to a form prevents Playwright
  100 | // from interacting with the wrong input fields when
  101 | // multiple forms have similar controls.
  102 | //
  103 | // It also avoids false-positive tests when buttons
  104 | // or inputs with the same labels exist elsewhere.
  105 | // test("debug: inspect form state mid-test", async ({ page }) => {
  106 | //   await page.goto("/");
  107 | 
  108 | //   await page.getByPlaceholder("Intern Name").fill("Debug Intern");
  109 | 
  110 | //   await page.pause();
  111 | 
  112 | //   await page.getByRole("button", {
  113 | //     name: "Add Intern",
  114 | //   }).click();
  115 | 
  116 | //   await expect(
  117 | //     page.getByText("Debug Intern")
  118 | //   ).toBeVisible();
  119 | // });
  120 | 
  121 | /*
  122 | page.pause() is useful when:
  123 | 
  124 | 1. A locator is failing and I want to inspect the DOM and verify which element Playwright is trying to locate.
  125 | 
  126 | 2. A form is not updating correctly and I want to inspect the page before the next action executes.
  127 | */
```