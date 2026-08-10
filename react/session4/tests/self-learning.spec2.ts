
/*
Soft assertions continue executing even after one assertion fails.
They are useful for smoke tests where we want to collect
multiple failures in a single run.
*/

import { test, expect } from "@playwright/test";
test("soft assertion demo", async ({ page }) => {

  await page.goto("/");

  await expect.soft(
    page.getByText("Intern Dashboard")
  ).toBeVisible();

  await expect.soft(
    page.getByRole("button",{name:"Add Intern"})
  ).toBeVisible();

  await expect.soft(
    page.getByPlaceholder("Search by name...")
  ).toBeVisible();

});
/*
page.route() intercepts network requests and returns
mock data instead of calling the real backend.

It is useful for testing loading,
errors and API responses without requiring
a running backend server.
*/
/*
Fixtures created using test.extend()
provide reusable setup for tests.

Unlike beforeEach,
fixtures can supply reusable objects such as
DashboardPage directly to the test.
*/
/*
Playwright stores baseline screenshots
inside the snapshots folder.

If the UI changes,
Playwright compares the new screenshot
against the saved baseline
and reports visual differences.
*/
/*
page.evaluate() executes JavaScript
inside the browser.

It can be used to read CSS variables,
localStorage,
sessionStorage,
or values from the DOM.
*/