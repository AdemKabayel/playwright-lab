import { defineConfig, devices } from '@playwright/test';

// Public exercises: no Conduit login, .env, or saved authentication needed.
export default defineConfig({
  testDir: './tests/practice',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
