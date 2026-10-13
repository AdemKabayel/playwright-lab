# Playwright Lab

## GraphQL and accessibility tests

These tests run separately from the main test suite and require no
Conduit account or `.env` file. They use public websites, so internet access is
required and service outages or site changes can cause failures.

```sh
npm ci
npx playwright install chromium
npm run test:examples
```

Run an individual test or debug it:

```sh
npm run test:graphql
npm run test:axe
npm run test:graphql -- --debug
npm run test:axe -- --headed
npx playwright show-report
```

The standalone test configuration is `playwright.examples.config.ts`. The original
`npx playwright test` command still runs the main suite and its login setup.
Both suites use the default report folder, so the HTML report shows the latest run.

## GraphQL: status → errors → data

Read `tests/examples/graphql.spec.ts`. It sends one POST to the public Countries
GraphQL API. The named `GetCountry` query selects four fields, and `$code: ID!`
declares a required variable supplied as `CA` in `variables`.

1. Check HTTP 200: the HTTP request succeeded.
2. Check that `errors` is absent: no GraphQL errors were reported.
3. Check `data.country`: the actual values match Canada, Ottawa, and CAD.

GraphQL can return HTTP 200 with an `errors` array, sometimes alongside partial
`data`. This successful query checks for that possibility; it does not reproduce
an HTTP-200 error response. Error status behaviour depends on the server and
the type of error, so do not assume every GraphQL failure returns 200.

The GraphQL test covers a successful country query. Permission checks, invalid
inputs, and mutations are outside its current scope.

## Accessibility: load → scan → inspect

Read `tests/examples/accessibility.spec.ts`. It opens the Playwright homepage,
waits for the Get started link, and uses `@axe-core/playwright` to scan the current
page for rules tagged WCAG 2.0/2.1 A and AA. It attaches the complete JSON results
to the HTML report and fails if any violations are found.

Open the `axe-results` attachment to inspect a finding's rule, impact, affected
elements (`nodes`), and help link. `incomplete` results need manual review.
If the public page later develops an issue, investigate the finding rather than
removing the assertion or disabling the rule just to get a passing test.

A passing scan covers only this page state and these automated rules; it does
not establish full WCAG compliance or cover menus/dialogs that were not opened.

## References

- [Countries API and schema](https://github.com/trevorblades/countries)
- [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing)
