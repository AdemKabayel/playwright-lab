import { test, expect } from '@playwright/test';

const email = process.env.CONDUIT_EMAIL!;
const password = process.env.CONDUIT_PASSWORD!;




test('Delete article', async ({ page, request }) => {
  const loginResponse = await request.post(
    'https://conduit-api.bondaracademy.com/api/users/login',
    {
      data: {
        user: {
          email,
          password,
        },
      },
    }
  );

  expect(loginResponse.status()).toEqual(200);

  const responseLoginJSON = await loginResponse.json();
  const token = responseLoginJSON.user.token;

  const newArticleResponse = await request.post(
    'https://conduit-api.bondaracademy.com/api/articles/',
    {
      data: {
        article: {
          title: 'Test new - apis',
          description: 'test description',
          body: 'test body',
          tagList: [],
        },
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  expect(newArticleResponse.status()).toEqual(201);

    await page.goto('https://conduit.bondaracademy.com/')
    await page.getByText('Sign in').click();
    
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password)
    await page.getByRole('button', { name: 'Sign in' }).click()
    await expect(page.locator('.preview-link h1').first()).toContainText('Test new - apis')
    await page.getByText('Test new - apis').click()
    await page.getByRole('button', {name: 'Delete Article'}).first().click()
    await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/feed?limit=10&offset=0')
    await expect(page.locator('.preview-link h1').first()).not.toContainText('Test new - apis')
});