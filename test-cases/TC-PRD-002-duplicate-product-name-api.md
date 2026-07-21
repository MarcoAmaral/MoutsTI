---
author: Marco Amaral — Senior QA
tc_id: TC-PRD-002
area: Produtos
type: API
priority: P1
automate: false
status: manually_verified
---

# TC-PRD-002 — `POST /produtos` duplicate name → 400

**Objective:** Confirm product-name uniqueness is enforced (admin-authenticated request).

**Preconditions:** Logged in as admin; a product with the target name already exists.

**Steps:**
1. Create a product as admin (setup).
2. `POST /produtos` again with the same `nome`.

**Expected result:** `400 Bad Request`, `{ "message": "Já existe produto com esse nome" }`.

**Actual result (manually verified live, 2026-07-20):** PASS — exact message returned. Product cleaned up after.

**Source grounding:** `ServeRest/ServeRest/src/controllers/produtos-controller.js` `exports.post` (`NAME_ALREADY_USED`).
