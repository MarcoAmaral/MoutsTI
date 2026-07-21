---
author: Marco Amaral — Senior QA
tc_id: TC-PRD-003
area: Produtos
type: API
priority: P2
automate: false
status: manually_verified
---

# TC-PRD-003 — `DELETE /produtos/:id` blocked while product is in a cart → 400

**Objective:** Confirm a product cannot be deleted while referenced by an active cart — data-integrity protection against orphaned cart line items.

**Preconditions:** A product currently referenced by at least one active cart.

**Steps:**
1. Create a product (admin), create a cart referencing it (as another user).
2. `DELETE /produtos/<that product's id>` (as admin).

**Expected result:** `400 Bad Request`, `{ "message": "Não é permitido excluir produto que faz parte de carrinho", "idCarrinhos": ["<cart id>"] }`.

**Actual result (manually verified live, 2026-07-20):** PASS — exact message and `idCarrinhos` array returned. Cart cancelled and product deleted afterward as cleanup.

**Source grounding:** `ServeRest/ServeRest/src/controllers/produtos-controller.js` `exports.delete` (`DELETE_PRODUCT_WITH_CART`).
