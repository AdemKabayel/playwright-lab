# Playwright course project

## Interview practice: GraphQL and accessibility

These two exercises run separately from the original course tests and require no
Conduit account or `.env` file. They use public websites, so internet access is
required and service outages or site changes can cause failures.

```sh
npm ci
npx playwright install chromium
npm run test:practice
```

Run one exercise or step through it:

```sh
npm run test:graphql
npm run test:axe
npm run test:graphql -- --debug
npm run test:axe -- --headed
npx playwright show-report
```

The practice configuration is `playwright.practice.config.ts`. The original
`npx playwright test` command still runs the course suite and its login setup.
Both suites use the default report folder, so the HTML report shows the latest run.

## GraphQL: status → errors → data

Read `tests/practice/graphql.spec.ts`. It sends one POST to the public Countries
GraphQL API. The named `GetCountry` query selects four fields, and `$code: ID!`
declares a required variable supplied as `CA` in `variables`.

1. Check HTTP 200: the HTTP request succeeded.
2. Check that `errors` is absent: no GraphQL errors were reported.
3. Check `data.country`: the actual values match Canada, Ottawa, and CAD.

GraphQL can return HTTP 200 with an `errors` array, sometimes alongside partial
`data`. This successful query checks for that possibility; it does not reproduce
an HTTP-200 error response. Error status behaviour depends on the server and
the type of error, so do not assume every GraphQL failure returns 200.

Try changing `CA` to `TR` and predicting which assertions will fail. Then update
the expected country values and rerun. To explore schema validation, temporarily
add a nonexistent field to the query and inspect the response in the debugger;
the server may reject it with a non-200 status. Restore the example afterwards.

After running and understanding this exercise, an accurate interview answer is:

> At work my API testing has been REST. I've also practised GraphQL on my own
> with a Playwright test against a public countries API. I sent a query with a
> country-code variable and checked the returned country details. The key thing
> is that HTTP 200 alone isn't enough, so I check for GraphQL errors as well as
> the data. For a real product I'd also test permissions, bad inputs, and whether
> mutations actually saved the intended change.

This is one query test. Permissions and mutations are follow-up ideas, not
coverage implemented here. Say “a test” rather than “a few tests” for now.

## Accessibility: load → scan → inspect

Read `tests/practice/accessibility.spec.ts`. It opens the Playwright homepage,
waits for the Get started link, and uses `@axe-core/playwright` to scan the current
page for rules tagged WCAG 2.0/2.1 A and AA. It attaches the complete JSON results
to the HTML report and fails if any violations are found.

Open the `axe-results` attachment to inspect a finding's rule, impact, affected
elements (`nodes`), and help link. `incomplete` results need manual review.
If the public page later develops an issue, investigate the finding rather than
removing the assertion or disabling the rule just to get a passing test.

Recall phrase: “I added an axe scan to Playwright, checked the violations, and
saved the results in the report. It catches some common issues, but I'd still
test keyboard navigation, focus, and screen-reader behaviour manually.”

A passing scan covers only this page state and these automated rules; it does
not establish full WCAG compliance or cover menus/dialogs that were not opened.

## References

- [Countries API and schema](https://github.com/trevorblades/countries)
- [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing)
