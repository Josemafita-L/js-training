# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: actions.spec.ts >> Checkbox Actions >> uncheck removes the checked state
- Location: tests\actions.spec.ts:128:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.uncheck: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('checkbox', { name: 'Present' })

```

# Test source

```ts
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
  55  |     .click();
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
> 135 |     await checkbox.uncheck();
      |                    ^ Error: locator.uncheck: Test timeout of 30000ms exceeded.
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
  156 | });
  157 | 
  158 | // check() only checks when necessary.
  159 | // click() toggles the checkbox and may uncheck an already checked box.
  160 | 
  161 | test.describe("Keyboard Actions", () => {
  162 | 
  163 |   test.beforeEach(async ({ page }) => {
  164 |     await page.goto("/");
  165 |   });
  166 | 
  167 |   test("Tab moves focus from name input to score input", async ({ page }) => {
  168 | 
  169 |     const nameInput =
  170 |       page.getByPlaceholder("Intern Name");
  171 | 
  172 |     const scoreInput =
  173 |       page.getByPlaceholder("Score");
  174 | 
  175 |     await nameInput.focus();
  176 | 
  177 |     await expect(nameInput).toBeFocused();
  178 | 
  179 |     await page.keyboard.press("Tab");
  180 | 
  181 |     await expect(scoreInput).toBeFocused();
  182 | 
  183 |   });
  184 | 
  185 | });
  186 | 
  187 | // locator.press() sends keys to one locator.
  188 | // page.keyboard.press() sends keys to the focused element.
  189 | 
  190 | test.describe("Clear and Type", () => {
  191 | 
  192 |   test.beforeEach(async ({ page }) => {
  193 |     await page.goto("/");
  194 |   });
  195 | 
  196 |   test("clear empties the score input", async ({ page }) => {
  197 | 
  198 |     const score =
  199 |       page.getByPlaceholder("Score");
  200 | 
  201 |     await score.fill("92");
  202 | 
  203 |     await score.clear();
  204 | 
  205 |     await expect(score).toHaveValue("0");
  206 | 
  207 |   });
  208 | 
  209 | });
  210 | 
  211 | // fill() replaces the entire value.
  212 | // type() enters one character at a time.
  213 | // type() is useful for search boxes and autocomplete.
  214 | 
  215 | test("type enters characters one by one", async ({ page }) => {
  216 | 
  217 |   await page.goto("/");
  218 | 
  219 |   const searchBox =
  220 |     page.getByPlaceholder("Search by name...");
  221 | 
  222 |   await searchBox.type("Rah");
  223 | 
  224 | await expect(
  225 |   page.getByRole("heading", { name: "Rahul" })
  226 | ).toBeVisible();
  227 | 
  228 | });
  229 | test.describe("Visual Testing", () => {
  230 | 
  231 |   test.beforeEach(async ({ page }) => {
  232 |     await page.goto("/");
  233 |   });
  234 | 
  235 |   test("intern dashboard matches the baseline screenshot", async ({ page }) => {
```