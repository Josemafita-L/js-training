# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: page-object.spec.ts >> Journeys via Page Object >> toggles theme and button label updates
- Location: tests\page-object.spec.ts:80:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /switch to/i })

```

# Test source

```ts
  1   | import { type Locator, type Page } from "@playwright/test";
  2   | 
  3   | // Page Object Model (POM) stores all page locators and actions in one place.
  4   | // If the "Intern Name" placeholder changes in the React component,
  5   | // only this file needs to be updated. The tests remain unchanged.
  6   | 
  7   | export class DashboardPage {
  8   | 
  9   |   readonly page: Page;
  10  | 
  11  |   readonly nameInput: Locator;
  12  |   readonly scoreInput: Locator;
  13  |   readonly roleSelect: Locator;
  14  | 
  15  |   readonly addButton: Locator;
  16  |   readonly resetButton: Locator;
  17  | 
  18  |   readonly searchInput: Locator;
  19  |   readonly themeToggle: Locator;
  20  | 
  21  |   constructor(page: Page) {
  22  | 
  23  |     this.page = page;
  24  | 
  25  |     this.nameInput = page.getByPlaceholder("Intern Name");
  26  |     this.scoreInput = page.getByPlaceholder("Score");
  27  | 
  28  |     this.roleSelect =
  29  |       page.locator('select[name="role"]');
  30  | 
  31  |     this.addButton =
  32  |       page.getByRole("button", {
  33  |         name: "Add Intern",
  34  |       });
  35  | 
  36  |     this.resetButton =
  37  |       page.getByRole("button", {
  38  |         name: "Reset",
  39  |       });
  40  | 
  41  |     this.searchInput =
  42  |       page.getByPlaceholder("Search by name...");
  43  | 
  44  |     this.themeToggle =
  45  |       page.getByRole("button", {
  46  |         name: /switch to/i,
  47  |       });
  48  |   }
  49  | 
  50  |   async goto() {
  51  |     await this.page.goto("/");
  52  |   }
  53  | 
  54  |   async addIntern(
  55  |     name: string,
  56  |     score: string,
  57  |     role = "Frontend"
  58  |   ) {
  59  | 
  60  |     await this.nameInput.fill(name);
  61  | 
  62  |     await this.scoreInput.clear();
  63  | 
  64  |     await this.scoreInput.fill(score);
  65  | 
  66  |     await this.roleSelect.selectOption(role);
  67  | 
  68  |     await this.addButton.click();
  69  |   }
  70  | 
  71  |   async search(query: string) {
  72  |     await this.searchInput.fill(query);
  73  |   }
  74  | 
  75  |   async clearSearch() {
  76  |     await this.searchInput.clear();
  77  |   }
  78  | 
  79  |   async toggleTheme() {
> 80  |     await this.themeToggle.click();
      |                            ^ Error: locator.click: Test timeout of 30000ms exceeded.
  81  |   }
  82  | 
  83  |   internCard(name: string): Locator {
  84  | 
  85  |     return this.page.getByTestId(`intern-${name}`);
  86  | 
  87  |   }
  88  | 
  89  |   removeButtonFor(name: string): Locator {
  90  | 
  91  |     return this.internCard(name)
  92  |       .getByRole("button", {
  93  |         name: "Remove",
  94  |       });
  95  | 
  96  |   }
  97  | 
  98  |   get internCount(): Locator {
  99  | 
  100 |     return this.page.getByRole("button", {
  101 |       name: "Remove",
  102 |     });
  103 | 
  104 |   }
  105 | 
  106 |   validationError(): Locator {
  107 | 
  108 |     // locatorA.or(locatorB) matches whichever locator
  109 |     // exists first. It is useful when applications use
  110 |     // different HTML structures for the same UI element.
  111 | 
  112 |     return this.page
  113 |       .getByRole("alert")
  114 |       .or(this.page.locator('[class*="error"]'));
  115 | 
  116 |   }
  117 | 
  118 | }
```