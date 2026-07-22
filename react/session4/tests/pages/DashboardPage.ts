import { type Locator, type Page } from "@playwright/test";

// Page Object Model (POM) stores all page locators and actions in one place.
// If the "Intern Name" placeholder changes in the React component,
// only this file needs to be updated. The tests remain unchanged.

export class DashboardPage {

  readonly page: Page;

  readonly nameInput: Locator;
  readonly scoreInput: Locator;
  readonly roleSelect: Locator;

  readonly addButton: Locator;
  readonly resetButton: Locator;

  readonly searchInput: Locator;
  readonly themeToggle: Locator;

  constructor(page: Page) {

    this.page = page;

    this.nameInput = page.getByPlaceholder("Intern Name");
    this.scoreInput = page.getByPlaceholder("Score");

    this.roleSelect =
      page.locator('select[name="role"]');

    this.addButton =
      page.getByRole("button", {
        name: "Add Intern",
      });

    this.resetButton =
      page.getByRole("button", {
        name: "Reset",
      });

    this.searchInput =
      page.getByPlaceholder("Search by name...");

    this.themeToggle =
      page.getByRole("button", {
        name: /switch to/i,
      });
  }

  async goto() {
    await this.page.goto("/");
  }

  async addIntern(
    name: string,
    score: string,
    role = "Frontend"
  ) {

    await this.nameInput.fill(name);

    await this.scoreInput.clear();

    await this.scoreInput.fill(score);

    await this.roleSelect.selectOption(role);

    await this.addButton.click();
  }

  async search(query: string) {
    await this.searchInput.fill(query);
  }

  async clearSearch() {
    await this.searchInput.clear();
  }

  async toggleTheme() {
    await this.themeToggle.click();
  }

  internCard(name: string): Locator {

    return this.page.getByTestId(`intern-${name}`);

  }

  removeButtonFor(name: string): Locator {

    return this.internCard(name)
      .getByRole("button", {
        name: "Remove",
      });

  }

  get internCount(): Locator {

    return this.page.getByRole("button", {
      name: "Remove",
    });

  }

  validationError(): Locator {

    // locatorA.or(locatorB) matches whichever locator
    // exists first. It is useful when applications use
    // different HTML structures for the same UI element.

    return this.page
      .getByRole("alert")
      .or(this.page.locator('[class*="error"]'));

  }

}