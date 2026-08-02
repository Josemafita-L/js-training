# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user-journeys.spec.ts >> User Journey - Remove Intern >> clicking Remove removes Rahul from the list
- Location: tests\user-journeys.spec.ts:225:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('intern-Rahul')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('intern-Rahul')

```

# Test source

```ts
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
  168 |     await searchBox.fill("Rah");
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
> 230 |     await expect(rahulCard).toBeVisible();
      |                             ^ Error: expect(locator).toBeVisible() failed
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
  269 |       page.getByTestId("intern-Amit")
  270 |     ).toBeVisible();
  271 | 
  272 |     await expect(
  273 |       page.getByTestId("intern-Sneha")
  274 |     ).toBeVisible();
  275 | 
  276 |   });
  277 | 
  278 | });
  279 | // Using a scoped locator (or data-testid) ensures that the
  280 | // Remove button belongs to the correct intern card.
  281 | //
  282 | // Using .first() is unreliable because if the order of interns
  283 | // changes, it may click the Remove button of a different intern,
  284 | // causing incorrect test results.
  285 | 
  286 | test.describe("User Journey — Theme Toggle", () => {
  287 | 
  288 |   test.beforeEach(async ({ page }) => {
  289 |     await page.goto("/");
  290 |   });
  291 | 
  292 |   test("toggle button shows Switch to Dark Mode initially", async ({ page }) => {
  293 | 
  294 |     await expect(
  295 |       page.getByRole("button", {
  296 |         name: /switch to dark mode/i,
  297 |       })
  298 |     ).toBeVisible();
  299 | 
  300 |   });
  301 | 
  302 |   test("clicking toggle changes button to Switch to Light Mode", async ({ page }) => {
  303 | 
  304 |     await page
  305 |       .getByRole("button", {
  306 |         name: /switch to dark mode/i,
  307 |       })
  308 |       .click();
  309 | 
  310 |     await expect(
  311 |       page.getByRole("button", {
  312 |         name: /switch to light mode/i,
  313 |       })
  314 |     ).toBeVisible();
  315 | 
  316 |   });
  317 | 
  318 |   test("clicking toggle again changes back to Switch to Dark Mode", async ({ page }) => {
  319 | 
  320 |     await page
  321 |       .getByRole("button", {
  322 |         name: /switch to dark mode/i,
  323 |       })
  324 |       .click();
  325 | 
  326 |     await page
  327 |       .getByRole("button", {
  328 |         name: /switch to light mode/i,
  329 |       })
  330 |       .click();
```