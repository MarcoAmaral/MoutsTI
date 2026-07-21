# Traceability Matrix — P0 Automated Scenarios

**Author:** Marco Amaral — Senior QA

Maps each of the 6 automated scenarios from **risk → business rule / source → spec file → test case → status**. For the full 22-scenario picture (including the 16 manually-verified, non-automated ones), see [`COVERAGE-MATRIX.md`](COVERAGE-MATRIX.md).

| Scenario | Risk (Score) | Business rule / source grounding | Spec file | Test case | Status |
|---|---|---|---|---|---|
| Login (client, valid) → redirect | P0 (20) | `src/controllers/login-controller.js` (`LOGIN_SUCCESS`); `front/src/views/login.js`; confirmed live in `ET-001` #11 | [`cypress/e2e/frontend/login.cy.js`](cypress/e2e/frontend/login.cy.js) | [`TC-AUTH-001`](test-cases/TC-AUTH-001-login-success.md) | Implemented, passing locally |
| Login (invalid) → error, no redirect | P0 (16) | `login-controller.js` (`LOGIN_FAIL`, 401); confirmed live in `ET-001` #10 | [`cypress/e2e/frontend/login.cy.js`](cypress/e2e/frontend/login.cy.js) | [`TC-AUTH-002`](test-cases/TC-AUTH-002-login-failure.md) | Implemented, passing locally |
| Register user via UI → success + redirect | P0 (16) | `front/src/views/registerUser.js`; `usuarios-controller.js` (`POST_SUCCESS`); confirmed live in `ET-001` #12 | [`cypress/e2e/frontend/register.cy.js`](cypress/e2e/frontend/register.cy.js) | [`TC-USR-001`](test-cases/TC-USR-001-register-user.md) | Implemented, passing locally |
| `POST /usuarios` success | P0 (25) | `usuarios-controller.js` `exports.post` (`POST_SUCCESS`, 201); confirmed live in `ET-001` #1 | [`cypress/e2e/api/usuarios.cy.js`](cypress/e2e/api/usuarios.cy.js) | [`TC-USR-002`](test-cases/TC-USR-002-create-user-api.md) | Implemented, passing locally |
| `POST /usuarios` duplicate email → 400 | P0 (20) | `usuarios-controller.js` `exports.post` (`EMAIL_ALREADY_USED`); confirmed live in `ET-001` #2 | [`cypress/e2e/api/usuarios.cy.js`](cypress/e2e/api/usuarios.cy.js) | [`TC-USR-003`](test-cases/TC-USR-003-duplicate-email-api.md) | Implemented, passing locally |
| `POST /produtos` without admin rights → 401/403 | P0 (15) | `authentication-middleware.js` `checkAdm` (`INVALID_TOKEN` / `REQUIRED_ADMIN`); confirmed live in `ET-001` #7-8 | [`cypress/e2e/api/produtos.cy.js`](cypress/e2e/api/produtos.cy.js) | [`TC-PRD-001`](test-cases/TC-PRD-001-product-admin-auth.md) | Implemented, passing locally |

## Reading this matrix

- **Risk (Score)** ties back to `COVERAGE-MATRIX.md`'s Likelihood × Impact scoring — nothing here was picked arbitrarily.
- **Business rule / source grounding** cites the exact controller/middleware and constant that produces the expected behavior, plus the `ET-001` exploratory session line that confirmed it live — each assertion is backed by source code and a live confirmation, not an assumption.
- **Status**: *Implemented, passing locally* means the spec exists, runs against the real public instance, and passes when run via `npm test` — verified directly, not assumed. This will move to *Automated in CI* once a CI workflow exists and these specs pass there too; no CI pipeline is wired yet (see `README.md` status table).
- One flake was found and fixed during verification: `TC-AUTH-001`/`TC-USR-001` initially timed out waiting for the post-submit redirect (Cypress's 4000ms default was too tight for this shared public instance's real-world latency). Fixed by raising the timeout on just those two assertions (`REDIRECT_TIMEOUT_MS` in `cypress/support/constants.js`) rather than a blanket global timeout increase.
