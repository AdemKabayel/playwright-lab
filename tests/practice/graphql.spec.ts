import { test, expect } from '@playwright/test';

test('GraphQL returns Canada without application errors', async ({ request }) => {
  const response = await request.post('https://countries.trevorblades.com/', {
    data: {
      // Choose the fields we need; pass input separately using a variable.
      query: `
        query GetCountry($code: ID!) {
          country(code: $code) {
            code
            name
            capital
            currency
          }
        }
      `,
      variables: { code: 'CA' },
    },
  });

  expect(response.status()).toBe(200);
  const body = await response.json();

  // HTTP 200 alone does not prove a GraphQL operation succeeded.
  // A successful response omits errors; failures can include partial data.
  expect(body.errors, JSON.stringify(body.errors)).toBeUndefined();
  expect(body.data.country).toEqual({
    code: 'CA',
    name: 'Canada',
    capital: 'Ottawa',
    currency: 'CAD',
  });
});
