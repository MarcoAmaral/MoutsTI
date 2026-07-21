---
author: Marco Amaral — Senior QA
tc_id: TC-AUTH-002
area: Auth
type: Frontend
priority: P0
automate: true
status: automated
---

# TC-AUTH-002 — Login with invalid credentials → error, no redirect

**Objective:** Confirm an invalid login attempt is rejected with a visible error and does not navigate away from `/login`.

**Preconditions:** None (credentials are expected to be invalid/non-existent).

**Test data:** Any non-existent email + arbitrary password.

**Steps:**
1. Navigate to `/login`.
2. Fill `email`/`senha` with invalid credentials.
3. Click `Entrar`.

**Expected result:** Stays on `/login`; a closable alert banner appears with the message "Email e/ou senha inválidos".

**Actual result (verified live, 2026-07-20, `ET-001` #10):** PASS — alert shown with exact expected text, `×` close button present, URL unchanged.

**Source grounding:** `ServeRest/ServeRest/src/controllers/login-controller.js` (`LOGIN_FAIL`, 401), `ServeRest/front/src/services/validateUser.js`.
