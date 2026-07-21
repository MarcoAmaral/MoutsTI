# Test Strategy — ServeRest QA Automation

| Field | Value |
|---|---|
| **Project** | ServeRest E2E + API automation (Senior QA Tester technical assignment, Mouts TI) |
| **Owner** | Marco Amaral — Senior QA |
| **Stack** | Cypress + JavaScript |
| **Targets** | Frontend `https://front.serverest.dev/`, API `https://serverest.dev/` |
| **Status** | Active |

---

## 1. Scope

### 1.1 In scope

| Area | Endpoints / pages | Business rules covered |
|---|---|---|
| Auth | `POST /login`, `/login` page | Valid/invalid credentials, token issuance, redirect-by-profile |
| Usuários (Users) | `POST/GET/PUT/DELETE /usuarios`, `/cadastrarusuarios` page | Registration, email uniqueness, not-found handling, cart-linked delete protection |
| Produtos (Products) | `POST/GET/PUT/DELETE /produtos` | Admin-only write access, name uniqueness, cart-linked delete protection |
| Carrinhos (Cart) | `POST/DELETE /carrinhos`, `/carrinhos` page | Token-gated access, one-cart-per-user limit, stock/duplicate validation |

### 1.2 Out of scope (and why)

| Item | Reason |
|---|---|
| Load/performance testing | ServeRest's own README explicitly forbids load testing against the public instance — only permitted against a locally self-hosted copy, which is out of scope for this assignment's deliverable |
| Cross-browser matrix | Single-browser (Chrome, Cypress default) is sufficient for a 6-scenario assignment; no business requirement stated for multi-browser support |
| Accessibility audit | Not requested in the assignment brief |
| Full regression of every endpoint | 22 candidate scenarios were identified (see `COVERAGE-MATRIX.md`); only the 6 highest-risk (P0) are automated now, the rest are documented and manually verifiable on request |
| CI/CD deploy of the app-under-test itself | ServeRest is a third-party demo app we test, not one we ship |

### 1.3 Test levels

This assignment authors **E2E and API-level tests only** — we don't own the ServeRest/front source, so there's no unit-test layer to add. All 6 automated checks sit at the E2E (Cypress, frontend) or API (Cypress `cy.request`, backend) level; no pyramid split applies beyond that 3/3 division.

---

## 2. Environments

| Tier | Frontend target | API target | Purpose |
|---|---|---|---|
| **dev** (local) | Patched fork of `ServeRest/front`, `localhost:3001` | Self-hosted `ServeRest/ServeRest`, `localhost:3000` | Fast, isolated local iteration — no shared-state collisions with other candidates hitting the public instance |
| **staging** | `front.serverest.dev` | `serverest.dev` | Pre-merge regression gate against the real target |
| **production** (`main`) | `front.serverest.dev` | `serverest.dev` | Final gate before a Release Please version/tag is cut |

---

## 3. Priority scale

Risk score = **Likelihood (1–5) × Impact (1–5)**, applied per candidate scenario in `COVERAGE-MATRIX.md`.

| Score | Priority | Meaning |
|---|---|---|
| 15–25 | **P0 / Critical** | Highest-risk paths — gates auth, data integrity, or authorization. Automated now. |
| 8–14 | **P1 / High** | Important business rules. Formally documented, manually verified once; automate next if the suite grows. |
| 4–7 | **P2 / Medium** | Secondary flows/edge cases. Documented, manually verified. |
| 1–3 | **P3 / Low** | Minor/rare edge case. Documented for completeness, lowest urgency. |

## 4. Risk-based test data strategy ("massa de dados")

- Every created record (user, product, cart) uses a **disposable, timestamp-suffixed identifier** (e.g. `qa.moutsti.<timestamp>@example.com`) to avoid collisions with other candidates or automated runs hitting the same shared public instance.
- Automated specs **clean up after themselves** via the API (`DELETE /usuarios/:id`, etc.) in an `afterEach`/`after` hook — verified manually first in `ET-001`, then encoded into the suite.
- No production credentials, real personal data, or secrets are used anywhere in test data or CI config.

---

## 5. Entry / exit criteria

**Entry (before automating a scenario):**
- [ ] Scenario exists in `COVERAGE-MATRIX.md` with an assigned priority
- [ ] Exact expected status code/message verified live (not just from source) — see `ET-001`
- [ ] Traced in `TRACEABILITY-MATRIX.md` before the spec is written

**Exit (suite considered done for this delivery):**
- [ ] All 6 P0 scenarios automated and passing on `staging` and `main` CI tiers
- [ ] Zero flaky runs across 3 consecutive CI executions
- [ ] All 16 non-automated scenarios manually executed at least once, with result recorded in their `TC-*.md` file
- [ ] No credentials/secrets present anywhere in the repo (manual review + `.gitignore` check)

---

## 6. What this strategy deliberately does not include

Deliberately scaled to a single-candidate submission, not a multi-person release gate:
- No tag taxonomy document, no generated status-tracking system, no team sign-off workflow.
- The execution notebook ([`EXECUTION-NOTEBOOK.md`](EXECUTION-NOTEBOOK.md)) is a single lightweight file scoped to the 6 P0 automated scenarios only — not a full per-feature notebook structure, which would be disproportionate to this assignment's scope.
