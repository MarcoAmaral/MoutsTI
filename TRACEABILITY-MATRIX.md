# Traceability Matrix — P0 Automated Scenarios

**Author:** Marco Amaral — Senior QA

Maps each of the 6 automated scenarios from **risk → business rule / source → planned spec file → test case → status**. For the full 22-scenario picture (including the 16 manually-verified, non-automated ones), see [`COVERAGE-MATRIX.md`](COVERAGE-MATRIX.md).

| Scenario | Risk (Score) | Business rule / source grounding | Planned spec file | Test case | Status |
|---|---|---|---|---|---|
| Login (client, valid) → redirect | P0 (20) | `src/controllers/login-controller.js` (`LOGIN_SUCCESS`); `front/src/views/login.js`; confirmed live in `ET-001` #11 | `cypress/e2e/frontend/login.cy.js` | [`TC-AUTH-001`](test-cases/TC-AUTH-001-login-success.md) | Planned — not yet implemented |
| Login (invalid) → error, no redirect | P0 (16) | `login-controller.js` (`LOGIN_FAIL`, 401); confirmed live in `ET-001` #10 | `cypress/e2e/frontend/login.cy.js` | [`TC-AUTH-002`](test-cases/TC-AUTH-002-login-failure.md) | Planned — not yet implemented |
| Register user via UI → success + redirect | P0 (16) | `front/src/views/registerUser.js`; `usuarios-controller.js` (`POST_SUCCESS`); confirmed live in `ET-001` #12 | `cypress/e2e/frontend/register.cy.js` | [`TC-USR-001`](test-cases/TC-USR-001-register-user.md) | Planned — not yet implemented |
| `POST /usuarios` success | P0 (25) | `usuarios-controller.js` `exports.post` (`POST_SUCCESS`, 201); confirmed live in `ET-001` #1 | `cypress/e2e/api/usuarios.cy.js` | [`TC-USR-002`](test-cases/TC-USR-002-create-user-api.md) | Planned — not yet implemented |
| `POST /usuarios` duplicate email → 400 | P0 (20) | `usuarios-controller.js` `exports.post` (`EMAIL_ALREADY_USED`); confirmed live in `ET-001` #2 | `cypress/e2e/api/usuarios.cy.js` | [`TC-USR-003`](test-cases/TC-USR-003-duplicate-email-api.md) | Planned — not yet implemented |
| `POST /produtos` without admin rights → 401/403 | P0 (15) | `authentication-middleware.js` `checkAdm` (`INVALID_TOKEN` / `REQUIRED_ADMIN`); confirmed live in `ET-001` #7-8 | `cypress/e2e/api/produtos.cy.js` | [`TC-PRD-001`](test-cases/TC-PRD-001-product-admin-auth.md) | Planned — not yet implemented |

## Reading this matrix

- **Risk (Score)** ties back to `COVERAGE-MATRIX.md`'s Likelihood × Impact scoring — nothing here was picked arbitrarily.
- **Business rule / source grounding** cites the exact controller/middleware and constant that produces the expected behavior, plus the `ET-001` exploratory session line that confirmed it live — each assertion is backed by source code and a live confirmation, not an assumption.
- **Status** will move from *Planned* → *Automated* only once the spec file exists and passes in CI on both the `staging` and `main` tiers — consistent with this project's verification-honesty rule.
