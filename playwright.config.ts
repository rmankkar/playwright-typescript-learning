import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test configuration.
 *
 * This file is the central configuration for the Playwright test runner.
 * When you run `npx playwright test`, Playwright automatically discovers
 * this file and applies its settings.
 *
 * Learn more: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Directory where Playwright looks for test files (*.test.ts, *.spec.ts)
  testDir: './tests',

  // Run test files in parallel. Each test file gets its own worker.
  fullyParallel: true,

  // In CI, fail the run if any test uses test.only().
  // Prevents accidentally shipping focused tests that skip the rest of the suite.
  forbidOnly: !!process.env.CI,

  // Retry failed tests: 2 retries in CI, 0 locally.
  // Helps with flaky tests in CI without slowing down local development.
  retries: process.env.CI ? 2 : 0,

  // HTML reporter: generates an HTML report after each run.
  // View it with: npx playwright show-report
  reporter: 'html',

  // Shared options for all tests:
  use: {
    // Base URL for all page.goto() calls.
    // page.goto('/login') becomes https://example.com/login
    baseURL: 'https://practicetestautomation.com/',

    // Capture a trace on first retry (CI only, since retries=0 locally).
    // Traces record DOM snapshots, network traffic, and console logs.
    trace: 'on-first-retry',
  },

  // Projects define browser configurations for cross-browser testing.
  projects: [
    {
      name: 'chromium',
      use: devices['Desktop Chrome'],
    },
    {
      name: 'firefox',
      use: devices['Desktop Firefox'],
    },
    {
      name: 'webkit',
      use: devices['Desktop Safari'],
    },
  ],
});
