---
author: Marco Amaral — Senior QA
tc_id: TC-USR-005
area: Usuários
type: API
priority: P2
automate: false
status: manually_verified
---

# TC-USR-005 — `PUT /usuarios/:id` duplicate email → 400

**Objective:** Confirm the email-uniqueness rule also applies on update, not just creation.

**Preconditions:** Two existing users, A and B, with distinct emails.

**Steps:**
1. `PUT https://serverest.dev/usuarios/<id of user A>` with a body whose `email` matches user B's email.

**Expected result:** `400 Bad Request`, `{ "message": "Este email já está sendo usado" }`.

**Actual result (manually verified live, 2026-07-20):** PASS — confirmed with two disposable users, cleaned up after.

**Source grounding:** `ServeRest/ServeRest/src/controllers/usuarios-controller.js` `exports.put` (`EMAIL_ALREADY_USED`).
