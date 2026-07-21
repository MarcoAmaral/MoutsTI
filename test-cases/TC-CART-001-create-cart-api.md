---
author: Marco Amaral — Senior QA
tc_id: TC-CART-001
area: Carrinhos
type: API
priority: P1
automate: false
status: manually_verified
---

# TC-CART-001 — `POST /carrinhos` success

**Objective:** Confirm a token-authenticated user can create a cart with valid product/quantity within stock.

**Preconditions:** A logged-in user (valid Bearer token) with no existing cart; a product with sufficient stock.

**Steps:**
1. `POST https://serverest.dev/carrinhos` with `{ "produtos": [{ "idProduto": "<id>", "quantidade": <n ≤ stock> }] }` and the user's `Authorization` token.

**Expected result:** `201 Created`, `{ "message": "Cadastro realizado com sucesso", "_id": "<cart id>" }`.

**Actual result (manually verified live, 2026-07-20):** PASS — cart created (2 units of a 5-in-stock product). Cancelled afterward via `DELETE /carrinhos/cancelar-compra` as cleanup (also restores stock).

**Source grounding:** `ServeRest/ServeRest/src/controllers/carrinhos-controller.js` `exports.post`.
