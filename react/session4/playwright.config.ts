import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Run multiple tests at the same time to make test execution faster.
  fullyParallel: true,

  // Retry failed tests 2 times in CI, but don't retry during local development.
  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',
  timeout: 30000,

  use: {
    // Base URL used by page.goto('/'), so you don't need to write the full URL.
    baseURL: 'http://localhost:5173',

    // Record a trace only when a test fails and is retried for easier debugging.
    trace: 'on-first-retry',

    screenshot: 'only-on-failure',
  },

 projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },

  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },

  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
],

  // Automatically starts the Vite development server before running tests.
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});