# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: actions.spec.ts >> Keyboard Actions >> Tab moves focus from name input to score input
- Location: tests\actions.spec.ts:167:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.focus: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByPlaceholder('Intern Name')

```

# Test source

```ts
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
> 175 |     await nameInput.focus();
      |                     ^ Error: locator.focus: Test timeout of 30000ms exceeded.
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
  236 | 
  237 |     await expect(page).toHaveScreenshot("intern-dashboard.png");
  238 | 
  239 |   });
  240 | 
  241 | });
  242 | // Findings:
  243 | //
  244 | // First run:
  245 | // The test failed because no baseline screenshot existed.
  246 | // Playwright captured the current page as the actual screenshot.
  247 | //
  248 | // After running with --update-snapshots:
  249 | // A baseline screenshot was created.
  250 | //
  251 | // Second run:
  252 | // Playwright compared the current page with the baseline,
  253 | // and the test passed because both screenshots matched.
  254 | //
  255 | // After changing visible text:
  256 | // The screenshot no longer matched the baseline,
  257 | // so Playwright failed the test and generated diff images
  258 | // showing the visual changes.
```