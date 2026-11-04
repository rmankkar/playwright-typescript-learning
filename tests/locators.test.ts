import { test, expect } from '@playwright/test';

/**
 * Locators test - demonstrates Playwright's locator strategies.
 *
 * Playwright locators are the heart of element selection. Unlike Selenium,
 * where you'd use findElement(By.id(...)) or findElement(By.xpath(...)),
 * Playwright uses user-facing locators that are resilient to DOM changes.
 *
 * Key locator strategies covered:
 * - getByRole: Finds elements by ARIA role (most resilient, recommended)
 * - getByLabel: Finds form fields by their associated <label> text
 * - getByText: Finds elements by visible text content
 * - getByTestId: Finds elements by data-testid attribute (when you control the page)
 *
 * All locators are auto-waiting: Playwright waits for the element to become
 * actionable before performing an action or assertion. No fixed sleeps needed.
 *
 * Related to Selenium: This replaces findElement(By...) calls. In Selenium you'd
 * manage implicit/explicit waits manually; Playwright handles waiting automatically.
 *
 * Page under test: practicetestautomation.com/practice-test-login/
 * Contains: <h2>Test login</h2>, <label>Username</label>, <label>Password</label>,
 * <button>Submit</button>, and several <h5> test-case headings.
 */

test('getByRole: finds elements by ARIA role', async ({ page }) => {
  // Navigate to the login page (baseURL from playwright.config.ts)
  await page.goto('/practice-test-login/');

  // getByRole finds elements by their ARIA role and accessible name.
  // 'heading' is the ARIA role for <h1> through <h6> elements.
  // This is the most resilient locator because it targets what users and
  // assistive technologies perceive, not CSS classes or DOM structure.
  const heading = page.getByRole('heading', { name: 'Test login' });

  // toBeVisible is a web-first assertion: Playwright auto-waits for the element
  // to become visible (up to the timeout, default 5000ms) before failing.
  // No fixed sleeps (waitForTimeout) are needed.
  await expect(heading).toBeVisible();
});

test('getByRole: finds buttons by ARIA role', async ({ page }) => {
  await page.goto('/practice-test-login/');

  // getByRole with 'button' finds <button> elements and elements with role="button".
  // The name filter matches the visible text of the button.
  const submitButton = page.getByRole('button', { name: 'Submit' });

  // toBeEnabled checks the element is not disabled (clickable).
  await expect(submitButton).toBeEnabled();

  // toBeVisible confirms the button is rendered and visible on the page.
  await expect(submitButton).toBeVisible();
});

test('getByLabel: finds form fields by their <label>', async ({ page }) => {
  await page.goto('/practice-test-login/');

  // getByLabel finds form controls by the text of their associated <label> element.
  // This is the recommended way to target inputs because labels are stable,
  // meaningful to users, and survive CSS/DOM refactors.
  const username = page.getByLabel('Username');
  const password = page.getByLabel('Password');

  // Both fields should be enabled (not disabled) and visible.
  await expect(username).toBeEnabled();
  await expect(username).toBeVisible();
  await expect(password).toBeEnabled();
  await expect(password).toBeVisible();

  // Example interaction (commented out - we're only verifying locators here):
  // await username.fill('student');
  // await password.fill('Password123');
});

test('getByText: finds elements by visible text content', async ({ page }) => {
  await page.goto('/practice-test-login/');

  // getByText finds elements containing the specified visible text.
  // Useful when no semantic role (like heading/button/link) applies.
  // Matches substring by default; use exact: true for exact match.
  const testCaseHeading = page.getByText('Test case 1: Positive LogIn test');

  await expect(testCaseHeading).toBeVisible();
});

test('getByTestId: finds elements by data-testid attribute', async ({ page }) => {
  await page.goto('/practice-test-login/');

  /**
   * getByTestId finds elements with a matching data-testid attribute.
   *
   * This requires developer cooperation: the application must add
   * data-testid="some-id" attributes to elements. It is the most resilient
   * locator when you control the code, because test IDs are not affected
   * by text changes, CSS class changes, or DOM restructuring.
   *
   * Example usage (conceptual - practicetestautomation.com does not use
   * data-testid, so we do not assert against it here):
   *
   *   const submitButton = page.getByTestId('submit-button');
   *   await expect(submitButton).toBeVisible();
   *
   * If your team controls the frontend, advocate for adding data-testid
   * attributes to key interactive elements. This decouples tests from
   * fragile CSS selectors and changing text content.
   */

  // Verifying the page still loads (navigation sanity check):
  await expect(page).toHaveURL(/\/practice-test-login/);
});
