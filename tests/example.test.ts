import { test, expect } from '@playwright/test';

/**
 * Smoke test - validates that the Playwright framework is set up correctly.
 *
 * This test verifies:
 * 1. Playwright can launch a browser
 * 2. Playwright can navigate to a page
 * 3. Playwright can locate an element using getByText
 * 4. Playwright can make web-first assertions on page title and element visibility
 *
 * Selenium comparison: In Selenium you'd need driver.get(), driver.findElement(),
 * implicit/explicit waits, and then an assertion. In Playwright, locators are
 * auto-waiting — no fixed sleeps needed.
 *
 * Debugging note: example.com no longer has an <h1> heading (it changed to only
 * <title> and <p>). We use toHaveTitle() and getByText() instead, which are
 * more stable for this page. This is a real-world example of locators breaking
 * when page content changes — you must investigate and update the test.
 */

test('smoke test: example.com loads and displays correct title and text', async ({ page }) => {
  // Navigate to baseURL (https://example.com) from playwright.config.ts
  // page.goto() waits for the page to load before resolving
  await page.goto('/');

  // toHaveTitle() is a web-first assertion on the page's <title> element.
  // Page titles are generally more stable than DOM headings.
  await expect(page).toHaveTitle('Practice Test Automation | Learn Selenium WebDriver');

  // getByText finds elements by their visible text content.
  // Useful when there's no semantic role (like heading/button) to target.
  const paragraph = page.getByText(
    'Welcome to Practice Test Automation!'
  );

  // Web-first assertion: Playwright auto-waits for the element to become visible
  // (up to timeout) before failing. No fixed sleeps needed.
  await expect(paragraph).toBeVisible();
});

// Capture a full-page screenshot automatically when a test in this file fails.
// This helps you visually debug what went wrong without re-running the test.
// Playwright saves the screenshot to test-results/ and embeds it in the HTML report.
test.afterEach(async ({ page }, testInfo) => {
  // testInfo.status === 'failed' means this test did not pass.
  // We only screenshot on failure to avoid cluttering the report with passing tests.
  if (testInfo.status === 'failed') {
    await testInfo.attach('failure-screenshot', {
      contentType: 'image/png',
      body: await page.screenshot({ fullPage: true }),
    });
  }
});
