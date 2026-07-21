# ServeRest QA Automation

[![Cypress E2E & API Tests](https://github.com/MarcoAmaral/MoutsTI/actions/workflows/cypress-tests.yml/badge.svg?branch=main)](https://github.com/MarcoAmaral/MoutsTI/actions/workflows/cypress-tests.yml)

Cypress + JavaScript test automation for [ServeRest](https://serverest.dev/) (API) and [front.serverest.dev](https://front.serverest.dev/) (frontend) — a Senior QA Tester technical assignment.

**Author:** Marco Amaral — Senior QA

## Status

| Deliverable | Status |
|---|---|
| Test strategy, risk analysis, coverage matrix | ✅ Done |
| 22 formal test cases designed and manually executed at least once | ✅ Done |
| 6 P0 scenarios automated in Cypress | ✅ Done — see `TRACEABILITY-MATRIX.md` |
| Dev/Staging/Production branch structure | ✅ Done |
| CI pipeline running the suite | ✅ Done — green on all 3 tiers (`dev`, `staging`, `main`), see `.github/workflows/cypress-tests.yml` |
| Branch protection requiring CI to pass | ✅ Done — `main` and `staging`, enforced for admins too |
| Linting (ESLint + Prettier) | ✅ Done |

This README describes the finished QA analysis and the automation plan built on top of it. Where something is not yet implemented, it's marked as such rather than described as done — see `TEST-STRATEGY.md` §5 (Entry/Exit criteria) for what "done" means on this project.

## Where to start

| If you want to… | Read |
|---|---|
| Understand scope, priority scale, environments | [`TEST-STRATEGY.md`](TEST-STRATEGY.md) |
| See all 22 scenarios considered, risk-scored and prioritized | [`COVERAGE-MATRIX.md`](COVERAGE-MATRIX.md) |
| See how the 6 automated scenarios trace back to source/risk | [`TRACEABILITY-MATRIX.md`](TRACEABILITY-MATRIX.md) |
| Read the formal test cases (all 22, including manual ones) | [`test-cases/`](test-cases/) |
| See the manual exploration session that grounded every assertion | [`exploratory-charters/ET-001-manual-exploration.md`](exploratory-charters/ET-001-manual-exploration.md) |
| Manually re-execute the 6 automated scenarios step-by-step (onboarding, sign-off) | [`EXECUTION-NOTEBOOK.md`](EXECUTION-NOTEBOOK.md) |
| Read or run the automated specs | [`cypress/e2e/`](cypress/e2e/) |
| See security practices already in place | [`SECURITY.md`](SECURITY.md) |

## How to run

```bash
npm install                     # installs Cypress + tooling, clears any old report/screenshots
npm test                        # runs the suite against the real public instance, then builds a report
npm run test:with-image-capture # same, plus a screenshot after every test (pass or fail), not just failures
npm run lint                    # ESLint
npm run format                  # Prettier, writes
npm run format:check            # Prettier, check-only (no writes)
```

Each run generates a uniquely timestamped report — `cypress/reports/report-<datetime>.html` — instead of overwriting the previous one. To browse past reports: `npm run report:open` (serves `cypress/reports/` on `localhost:4873`). Reports and screenshots aren't committed (`.gitignore`); a fresh `npm install` clears them out entirely.

## Why 22 scenarios, only 6 automated

The assignment asks for 3 E2E + 3 API scenarios. Source review of `ServeRest/ServeRest` and `ServeRest/front` (routes, controllers, constants) surfaced 22 distinct, real business rules — not a padded list. All 22 are formally documented and were manually executed at least once against the live public instance; the 6 highest-risk ones (by Likelihood × Impact scoring, see `COVERAGE-MATRIX.md`) are the ones being automated, matching what was asked while showing the fuller picture that was considered.

## Two additional tests, beyond the original 22

These weren't part of the initial source-review pass — they came from deeper QA work during automation itself, not from padding the count. See `COVERAGE-MATRIX.md` for full detail:

- **Weak-password gap** (`TC-USR-009`) — `POST /usuarios` enforces no password complexity/length at all. Written as a *characterization test* (pins the actual behavior, not the secure behavior it should have) since this is third-party source we don't own/can't fix.
- **XSS sanitization check** (`TC-SEC-001`) — verifies a script-style payload in a user's `nome` renders as literal text on the admin welcome page, not as executable markup. Passes, confirming React's default JSX escaping actually protects this render path — a passing security test is still real evidence, not a no-op.

## Approach

1. **Manual exploration first** (`ET-001`) — verified exact status codes/messages against the *live* instance before writing any assertion, not just inferred from source.
2. **Risk-based prioritization** — every scenario scored, not picked by feel.
3. **Automation second** — only after the strategy/coverage/traceability were settled.

## Stack

- Cypress + JavaScript
- ESLint + Prettier
- Release Please + Conventional Commits for versioning/changelog (`.github/workflows/release-please.yml`)

## Environments

All tests run against the real public targets on every branch tier — `front.serverest.dev` (frontend) and `serverest.dev` (API). The `dev`/`staging`/`main` branches reflect promotion/review discipline, not different hosted environments. Local source clones are kept only as a reference for grounding assertions, not executed. Full rationale in `TEST-STRATEGY.md` §2.

## Security

No credentials, secrets, or real personal data are used anywhere in this repo. All test data uses disposable, timestamp-suffixed identifiers, created and deleted within each test run — verified manually first (`ET-001`) to confirm the cleanup actually works before relying on it in automation. Full practices, including the accepted dependency-risk decision and the CI audit gate, in [`SECURITY.md`](SECURITY.md).

## Test data strategy ("massa de dados")

Every user/product/cart created — manually during exploration or by the automated suite — uses a disposable identifier and is deleted immediately after use, so runs don't collide with other candidates or leave residue on the shared public instance. Details in `TEST-STRATEGY.md` §4.
