# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user-journeys.spec.ts >> User Journey - Search and Filter >> clearing search restores all interns
- Location: tests\user-journeys.spec.ts:163:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByPlaceholder('Search by name...')

```

# Test source

```ts
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
  152 | and displayed that no matching element existed.
  153 | This is easier than reading only the terminal error because
  154 | I can inspect the page visually while the test is paused.
  155 | */
  156 | 
  157 |     await expect(
  158 |       page.getByRole("heading", { name: "Priya" })
  159 |     ).not.toBeVisible();
  160 | 
  161 |   });
  162 | 
  163 |   test("clearing search restores all interns", async ({ page }) => {
  164 | 
  165 |     const searchBox =
  166 |       page.getByPlaceholder("Search by name...");
  167 | 
> 168 |     await searchBox.fill("Rah");
      |                     ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  169 | 
  170 |     await searchBox.clear();
  171 | 
  172 |     await expect(
  173 |       page.getByRole("heading", { name: "Rahul" })
  174 |     ).toBeVisible();
  175 | 
  176 |     await expect(
  177 |       page.getByRole("heading", { name: "Priya" })
  178 |     ).toBeVisible();
  179 | 
  180 |   });
  181 | 
  182 |   test("search is case insensitive", async ({ page }) => {
  183 | 
  184 |     const searchBox =
  185 |       page.getByPlaceholder("Search by name...");
  186 | 
  187 |     await searchBox.fill("rahul");
  188 | 
  189 |     await expect(
  190 |       page.getByRole("heading", { name: "Rahul" })
  191 |     ).toBeVisible();
  192 | 
  193 |   });
  194 | 
  195 |   test("shows empty state when no intern matches", async ({ page }) => {
  196 | 
  197 |     const searchBox =
  198 |       page.getByPlaceholder("Search by name...");
  199 | 
  200 |     await searchBox.fill("zzz");
  201 | 
  202 |     await expect(
  203 |       page.getByText("No Intern Found")
  204 |     ).toBeVisible();
  205 | 
  206 |   });
  207 | 
  208 | });
  209 | 
  210 | // type() enters text one character at a time,
  211 | // just like a real user typing.
  212 | //
  213 | // It triggers keyboard events for every character,
  214 | // making it ideal for live search and autocomplete.
  215 | //
  216 | // fill() replaces the entire value at once,
  217 | // while type() better simulates real user behaviour.
  218 | 
  219 | test.describe("User Journey - Remove Intern", () => {
  220 | 
  221 |   test.beforeEach(async ({ page }) => {
  222 |     await page.goto("/");
  223 |   });
  224 | 
  225 |   test("clicking Remove removes Rahul from the list", async ({ page }) => {
  226 | 
  227 |     const rahulCard =
  228 |       page.getByTestId("intern-Rahul");
  229 | 
  230 |     await expect(rahulCard).toBeVisible();
  231 | 
  232 |     await rahulCard
  233 |       .getByRole("button", { name: "Remove" })
  234 |       .click();
  235 | 
  236 |     await expect(rahulCard).not.toBeVisible();
  237 | 
  238 |   });
  239 | 
  240 |   test("intern count decreases after removal", async ({ page }) => {
  241 | 
  242 |     await expect(
  243 |       page.getByRole("button", { name: "Remove" })
  244 |     ).toHaveCount(4);
  245 | 
  246 |     await page
  247 |       .getByTestId("intern-Rahul")
  248 |       .getByRole("button", { name: "Remove" })
  249 |       .click();
  250 | 
  251 |     await expect(
  252 |       page.getByRole("button", { name: "Remove" })
  253 |     ).toHaveCount(3);
  254 | 
  255 |   });
  256 | 
  257 |   test("other interns remain after Rahul is removed", async ({ page }) => {
  258 | 
  259 |     await page
  260 |       .getByTestId("intern-Rahul")
  261 |       .getByRole("button", { name: "Remove" })
  262 |       .click();
  263 | 
  264 |     await expect(
  265 |       page.getByTestId("intern-Priya")
  266 |     ).toBeVisible();
  267 | 
  268 |     await expect(
```