---
author: Marco Amaral — Senior QA
tc_id: TC-USR-003
area: Usuários
type: API
priority: P0
automate: true
status: automated
---

# TC-USR-003 — `POST /usuarios` duplicate email → 400

**Objective:** Confirm the email-uniqueness business rule is enforced at the API level.

**Preconditions:** A user with the target email already exists.

**Test data:** Same payload as an already-created user (matching `email`).

**Steps:**
1. Create a user via `POST /usuarios` (setup step, not part of the assertion).
2. `POST /usuarios` again with the same `email` (different or same other fields).

**Expected result:** `400 Bad Request`, body `{ "message": "Este email já está sendo usado" }`.

**Actual result (verified live, 2026-07-20, `ET-001` #2):** PASS — exact message returned. Both the setup user and any residual data cleaned up after.

**Source grounding:** `ServeRest/ServeRest/src/controllers/usuarios-controller.js` `exports.post` (`EMAIL_ALREADY_USED`).
