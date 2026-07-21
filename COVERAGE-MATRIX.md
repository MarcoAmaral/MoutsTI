# Coverage Matrix — ServeRest QA Automation

**Author:** Marco Amaral — Senior QA

All 22 scenarios identified during source review (`ServeRest/ServeRest`, `ServeRest/front`) and live exploration (`ET-001`), scored by risk (**Likelihood × Impact**, 1–5 each) and prioritized per the scale in `TEST-STRATEGY.md` §3.

Every scenario here has a corresponding formal test case in [`test-cases/`](test-cases/) — including the 16 that aren't automated. "Documented" is not "designed on paper only": each was manually executed at least once against the live public instance, with the result recorded in its `TC-*.md` file.

| ID | Area | Type | Scenario | +/− | L | I | Score | Priority | Automate? | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| TC-USR-002 | Usuários | API | `POST /usuarios` success | + | 5 | 5 | 25 | **P0** | ✅ Yes | Automated² |
| TC-AUTH-001 | Auth | Frontend | Login (client, valid) → redirect | + | 4 | 5 | 20 | **P0** | ✅ Yes | Automated² |
| TC-USR-003 | Usuários | API | `POST /usuarios` duplicate email → 400 | − | 4 | 5 | 20 | **P0** | ✅ Yes | Automated² |
| TC-AUTH-002 | Auth | Frontend | Login (invalid) → error, no redirect | − | 4 | 4 | 16 | **P0** | ✅ Yes | Automated² |
| TC-USR-001 | Usuários | Frontend | Register user via UI → success + redirect | + | 4 | 4 | 16 | **P0** | ✅ Yes | Automated² |
| TC-PRD-001 | Produtos | API | `POST /produtos` without admin rights → 401/403 | − | 3 | 5 | 15 | **P0** | ✅ Yes | Automated² |
| TC-AUTH-003 | Auth | Frontend | Login (admin, valid) → redirect | + | 3 | 4 | 12 | P1 | No | Manually verified |
| TC-CART-001 | Carrinhos | API | `POST /carrinhos` success | + | 3 | 4 | 12 | P1 | No | Manually verified |
| TC-AUTH-004 | Auth | API | `POST /login` valid → 200 + token | + | 3 | 4 | 12 | P1¹ | No | Manually verified |
| TC-AUTH-005 | Auth | API | `POST /login` invalid → 401 | − | 3 | 4 | 12 | P1¹ | No | Manually verified |
| TC-USR-004 | Usuários | API | `GET /usuarios/:id` well-formed, non-existent → 400 | − | 3 | 3 | 9 | P1 | No | Manually verified |
| TC-PRD-002 | Produtos | API | `POST /produtos` duplicate name → 400 | − | 3 | 3 | 9 | P1 | No | Manually verified |
| TC-PRD-004 | Produtos | Frontend | Admin: create product via UI | + | 3 | 3 | 9 | P1 | No | Manually verified |
| TC-CART-004 | Carrinhos | API | `POST /carrinhos` insufficient stock → 400 | − | 3 | 3 | 9 | P1 | No | Manually verified |
| TC-USR-006 | Usuários | API | `DELETE /usuarios/:id` blocked while user owns a cart → 400 | − | 2 | 4 | 8 | P1 | No | Manually verified |
| TC-USR-005 | Usuários | API | `PUT /usuarios/:id` duplicate email → 400 | − | 2 | 3 | 6 | P2 | No | Manually verified |
| TC-USR-007 | Usuários | Frontend | Admin: list/delete users via UI | + | 2 | 3 | 6 | P2 | No | Manually verified |
| TC-PRD-003 | Produtos | API | `DELETE /produtos/:id` blocked while in a cart → 400 | − | 2 | 3 | 6 | P2 | No | Manually verified |
| TC-CART-002 | Carrinhos | API | `POST /carrinhos` blocked, user already has a cart → 400 | − | 2 | 3 | 6 | P2 | No | Manually verified |
| TC-CART-003 | Carrinhos | API | `POST /carrinhos` duplicate product in payload → 400 | − | 2 | 3 | 6 | P2 | No | Manually verified |
| TC-CART-006 | Carrinhos | Frontend | Client: browse products, add to list | + | 2 | 2 | 4 | P2 | No | Manually verified |
| TC-CART-005 | Carrinhos | API | `DELETE /carrinhos/concluir-compra` with no cart → 200 | + | 1 | 2 | 2 | P3 | No | Manually verified |

¹ Scored 12 by the raw formula, but deliberately not selected among the automated 6: the same `/login` contract (valid + invalid credentials) is already exercised end-to-end by `TC-AUTH-001`/`TC-AUTH-002` through the UI, which calls the identical API underneath. A standalone API-level login test would be marginally useful as a contract check but is redundant coverage, not missing coverage — documented and manually verified instead of automated, to avoid testing the same behavior twice for the sake of a round number.

² **Automated, verified in CI** — all 6 Cypress specs exist (see `TRACEABILITY-MATRIX.md` for file mapping), run against the real public instance, and pass in `.github/workflows/cypress-tests.yml` on all three branch tiers (`dev`, `staging`, `main`), with branch protection requiring the check to pass before merging into `staging`/`main`.

## Summary

| Priority | Count | Automated |
|---|---|---|
| P0 (Critical) | 6 | 6 / 6 (CI-verified on all 3 tiers) |
| P1 (High) | 9 | 0 / 9 (manually verified) |
| P2 (Medium) | 6 | 0 / 6 (manually verified) |
| P3 (Low) | 1 | 0 / 1 (manually verified) |
| **Total** | **22** | **22 / 22 documented + executed at least once; 6 automated and CI-verified** |

See [`TRACEABILITY-MATRIX.md`](TRACEABILITY-MATRIX.md) for how the 6 automated scenarios map from risk → business rule → spec file.

## Additional tests beyond the original 22

These weren't identified during the original source-review/exploration pass that produced the 22 scenarios above — they emerged from deeper QA work carried out *during* automation itself. Documented separately rather than folded into the "22" count above, to keep that number honest (it reflects what the original static + live analysis actually found).

| ID | Area | Type | Scenario | Status |
|---|---|---|---|---|
| TC-USR-009 | Usuários | API | `POST /usuarios` accepts a trivially weak password (1 char, no complexity/length rule) | Automated — [characterization test](test-cases/TC-USR-009-weak-password-characterization.md), pins the actual (insecure) behavior rather than a desired-but-false one, since this is third-party source not owned/fixable here |
| TC-SEC-001 | Segurança | Frontend | XSS payload in admin `nome` renders as literal text on `/admin/home`, not executed | Automated — [passing security check](test-cases/TC-SEC-001-xss-admin-nome.md), confirms React's default JSX escaping actually protects this render path |

**Why the weak-password one isn't scored/prioritized like the other 22:** it's not a missing-coverage gap in *our* test suite — it's a finding about ServeRest's own validation. A risk score (Likelihood × Impact) is a QA prioritization tool for deciding what *we* automate next; this isn't a candidate for more automation, it's already fully captured by the one test that exists. Full reasoning on the CI-green-vs-red decision in `TEST-STRATEGY.md`.
