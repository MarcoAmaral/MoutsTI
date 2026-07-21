---
author: Marco Amaral — Senior QA
tc_id: TC-CART-005
area: Carrinhos
type: API
priority: P3
automate: false
status: manually_verified
---

# TC-CART-005 — `DELETE /carrinhos/concluir-compra` with no cart → 200

**Objective:** Confirm calling "complete purchase" for a user with no active cart is handled gracefully (not an error) — lowest-risk of the 22 scenarios since it's a benign no-op path.

**Preconditions:** A logged-in user with no active cart.

**Steps:**
1. `DELETE https://serverest.dev/carrinhos/concluir-compra` with that user's token.

**Expected result:** `200 OK`, `{ "message": "Não foi encontrado carrinho para esse usuário" }`.

**Actual result (manually verified live, 2026-07-20):** PASS.

**Source grounding:** `ServeRest/ServeRest/src/controllers/carrinhos-controller.js` `exports.concluirCompra` (`NO_CART`).
