import { defineConfig, devices } from '@playwright/test';

// Public API and accessibility tests: no Conduit login, .env, or saved authentication needed.
export default defineConfig({
  testDir: './tests/examples',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
