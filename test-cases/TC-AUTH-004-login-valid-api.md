---
author: Marco Amaral — Senior QA
tc_id: TC-AUTH-004
area: Auth
type: API
priority: P1
automate: false
status: manually_verified
---

# TC-AUTH-004 — `POST /login` valid → 200 + token

**Objective:** Confirm the `/login` API contract directly (not just through the UI), issuing a Bearer token on success.

**Note on priority:** Scores P1 despite the underlying flow being critical, because `TC-AUTH-001`/`TC-AUTH-002` already exercise this same endpoint end-to-end through the UI — this is a standalone contract check, not missing coverage. See `COVERAGE-MATRIX.md` footnote 1.

**Preconditions:** A registered user with known credentials.

**Steps:**
1. `POST https://serverest.dev/login` with valid `email`/`password`.

**Expected result:** `200 OK`, `{ "message": "Login realizado com sucesso", "authorization": "Bearer <jwt>" }`.

**Actual result (manually verified live, 2026-07-20, `ET-001` #3):** PASS.

**Source grounding:** `ServeRest/ServeRest/src/controllers/login-controller.js` (`LOGIN_SUCCESS`).
