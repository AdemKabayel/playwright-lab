import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Playwright homepage has no axe WCAG A/AA violations', async ({ page }, testInfo) => {
  await page.goto('https://playwright.dev/');
  // Check the expected page is ready before scanning its current state.
  await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  // Keep affected elements, help links, and incomplete checks in the report.
  await testInfo.attach('axe-results', {
    body: JSON.stringify(results, null, 2),
    contentType: 'application/json',
  });

  // A passing scan still needs manual keyboard and screen-reader testing.
  expect(results.violations).toEqual([]);
});
