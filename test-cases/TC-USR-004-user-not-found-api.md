---
author: Marco Amaral — Senior QA
tc_id: TC-USR-004
area: Usuários
type: API
priority: P1
automate: false
status: manually_verified
---

# TC-USR-004 — `GET /usuarios/:id` well-formed, non-existent id → 400

**Objective:** Confirm the "user not found" business rule fires for a well-formed but non-existent id — distinct from the schema-validation error a malformed id produces (see note).

**Note (finding from `ET-001`):** A **malformed** id (wrong length/format) is rejected by a request-schema validator before reaching business logic, returning `{"id": "..."}` (no `message` key) — a different, lower-priority case not tracked in the coverage matrix. This TC targets the actual `USER_NOT_FOUND` business rule, which requires a well-formed (16-char alphanumeric) id that simply isn't in the datastore.

**Test data:** A 16-char alphanumeric id known not to exist (e.g. an id that was just deleted).

**Steps:**
1. `GET https://serverest.dev/usuarios/<well-formed, non-existent id>`.

**Expected result:** `400 Bad Request`, `{ "message": "Usuário não encontrado" }`.

**Actual result (manually verified live, 2026-07-20, `ET-001` #6):** PASS.

**Source grounding:** `ServeRest/ServeRest/src/controllers/usuarios-controller.js` `exports.getOne` (`USER_NOT_FOUND`).
