import { test, expect } from "@playwright/test";
import { DashboardPage } from "./pages/DashboardPage";

test.describe("Journeys via Page Object", () => {

  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {

    dashboard = new DashboardPage(page);

    await dashboard.goto();

  });

  test("adds a new intern", async () => {

    await dashboard.addIntern(
      "Vikram",
      "88",
      "Backend"
    );

    await expect(
      dashboard.internCard("Vikram")
    ).toBeVisible();

    await expect(
      dashboard.internCount
    ).toHaveCount(5);

  });

  test("searches and filters the list", async () => {

    await dashboard.search("Rah");

    await expect(
  dashboard.page.getByRole("heading", { name: "Rahul" }).first()
).toBeVisible();

    await expect(
      dashboard.internCard("Rahul")
    ).toBeVisible();

  });

  test("clears search and restores all interns", async () => {

    await dashboard.search("Rah");

    await dashboard.clearSearch();

    await expect(
      dashboard.internCount
    ).toHaveCount(4);

  });

  test("removes an intern by name", async () => {

    await dashboard
      .removeButtonFor("Rahul")
      .click();

    await expect(
      dashboard.internCard("Rahul")
    ).not.toBeVisible();

    await expect(
      dashboard.internCount
    ).toHaveCount(3);

  });

  // dashboard.themeToggle is created once in the constructor.
  // After clicking it, the button text changes to "Switch to Light Mode".
  // Checking for "Light" confirms the theme switched successfully.

  test("toggles theme and button label updates", async () => {

    await dashboard.toggleTheme();

    await expect(
      dashboard.themeToggle
    ).toContainText("Light");

  });

  test("shows validation error on empty submit", async () => {

    await dashboard.addButton.click();

    await expect(
      dashboard.validationError()
    ).toBeVisible();

  });

});

test("chromium-only feature check", async ({
  page,
  browserName,
}) => {

  test.skip(
    browserName !== "chromium",
    "Chromium only"
  );

  await page.goto("/");

  await expect(
    page.getByText("Intern Dashboard")
  ).toBeVisible();

});
/*
test.skip(browserName !== "chromium")
is useful when testing browser-specific APIs
such as the File System Access API,
which is not fully supported across all browsers.
*/