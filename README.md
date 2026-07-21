# ServeRest QA Automation

Cypress + JavaScript test automation for [ServeRest](https://serverest.dev/) (API) and [front.serverest.dev](https://front.serverest.dev/) (frontend) — a Senior QA Tester technical assignment.

**Author:** Marco Amaral — Senior QA

## Status

| Deliverable | Status |
|---|---|
| Test strategy, risk analysis, coverage matrix | ✅ Done |
| 22 formal test cases designed and manually executed at least once | ✅ Done |
| 6 P0 scenarios automated in Cypress | ⏳ Planned — see `TRACEABILITY-MATRIX.md` |
| Dev/Staging/Production branch structure + CI | ⏳ Planned |

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

## Why 22 scenarios, only 6 automated

The assignment asks for 3 E2E + 3 API scenarios. Source review of `ServeRest/ServeRest` and `ServeRest/front` (routes, controllers, constants) surfaced 22 distinct, real business rules — not a padded list. All 22 are formally documented and were manually executed at least once against the live public instance; the 6 highest-risk ones (by Likelihood × Impact scoring, see `COVERAGE-MATRIX.md`) are the ones being automated, matching what was asked while showing the fuller picture that was considered.

## Approach

1. **Manual exploration first** (`ET-001`) — verified exact status codes/messages against the *live* instance before writing any assertion, not just inferred from source.
2. **Risk-based prioritization** — every scenario scored, not picked by feel.
3. **Automation second** — only after the strategy/coverage/traceability were settled.

## Stack

- Cypress + JavaScript
- Release Please + Conventional Commits for versioning/changelog (`.github/workflows/release-please.yml`)

## Environments (planned)

| Tier | Frontend | API | Purpose |
|---|---|---|---|
| dev (local) | Patched fork of `ServeRest/front`, `localhost:3001` | Self-hosted `ServeRest/ServeRest`, `localhost:3000` | Isolated local iteration |
| staging | `front.serverest.dev` | `serverest.dev` | Pre-merge regression gate |
| production (`main`) | `front.serverest.dev` | `serverest.dev` | Final gate, Release Please cuts a version |

Full rationale in `TEST-STRATEGY.md` §2.

## Security

No credentials, secrets, or real personal data are used anywhere in this repo. All test data uses disposable, timestamp-suffixed identifiers, created and deleted within each test run — verified manually first (`ET-001`) to confirm the cleanup actually works before relying on it in automation.

## Test data strategy ("massa de dados")

Every user/product/cart created — manually during exploration or by the automated suite — uses a disposable identifier and is deleted immediately after use, so runs don't collide with other candidates or leave residue on the shared public instance. Details in `TEST-STRATEGY.md` §4.
