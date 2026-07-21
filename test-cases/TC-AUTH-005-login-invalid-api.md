---
author: Marco Amaral — Senior QA
tc_id: TC-AUTH-005
area: Auth
type: API
priority: P1
automate: false
status: manually_verified
---

# TC-AUTH-005 — `POST /login` invalid → 401

**Objective:** Confirm the `/login` API rejects invalid credentials with the correct status/message, directly at the API level.

**Note on priority:** Same rationale as `TC-AUTH-004` — already exercised end-to-end via `TC-AUTH-002` through the UI.

**Steps:**
1. `POST https://serverest.dev/login` with a correct email but wrong password.

**Expected result:** `401 Unauthorized`, `{ "message": "Email e/ou senha inválidos" }`.

**Actual result (manually verified live, 2026-07-20, `ET-001` #4):** PASS.

**Source grounding:** `ServeRest/ServeRest/src/controllers/login-controller.js` (`LOGIN_FAIL`).
