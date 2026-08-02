# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: page-object.spec.ts >> chromium-only feature check
- Location: tests\page-object.spec.ts:102:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Intern Dashboard')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Intern Dashboard')

```

# Test source

```ts
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
  64  |       .click();
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
> 116 |   ).toBeVisible();
      |     ^ Error: expect(locator).toBeVisible() failed
  117 | 
  118 | });
  119 | /*
  120 | test.skip(browserName !== "chromium")
  121 | is useful when testing browser-specific APIs
  122 | such as the File System Access API,
  123 | which is not fully supported across all browsers.
  124 | */
```