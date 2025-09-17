import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: "tests",

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  // retries: process.env.CI ? 2 : 0,

  workers: 4,
  retries: 5,

  // Opt out of parallel tests on CI.
  // workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: "html",

  expect: {
    timeout: 10 * 1000,
  },

  // globalSetup: process.env.SKIP_AUTH ? '' : 'global-setup.ts',

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: "http://localhost:3000/",

    // Collect trace when retrying the failed test.
    trace: "on-first-retry",
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: "authenticated",
      testMatch: "**/authenticated.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "auth.local.json",
      },
    },
    {
      name: "unauthenticated",
      testMatch: "**/unauthenticated.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        storageState: undefined,
      },
    },
  ],
  // Run your local dev server before starting the tests.
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000/",
    reuseExistingServer: !process.env.CI,
  },
});
