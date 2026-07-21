---
author: Marco Amaral — Senior QA
tc_id: TC-USR-007
area: Usuários
type: Frontend
priority: P2
automate: false
status: manually_verified
---

# TC-USR-007 — Admin: list and delete a user via UI

**Objective:** Confirm the admin user-management screen lists users and can delete one via its "Excluir" action.

**Preconditions:** Logged in as an admin user; at least one disposable target user exists.

**Steps:**
1. Navigate to `/admin/listarusuarios`.
2. Locate the target user's row.
3. Click that row's `Excluir` button.
4. Verify (via `GET /usuarios/:id`) the user no longer exists.

**Expected result:** The user is removed; a subsequent lookup returns `USER_NOT_FOUND`.

**Actual result (manually verified live, 2026-07-20):** PASS — disposable "QA U3" user deleted via the UI table's Excluir button; confirmed gone via API lookup afterward.

**Source grounding:** `ServeRest/front/src/views/admin/showUsers.js` (Excluir action calling `DELETE /usuarios/:id`).
