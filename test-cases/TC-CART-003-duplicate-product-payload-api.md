---
author: Marco Amaral — Senior QA
tc_id: TC-CART-003
area: Carrinhos
type: API
priority: P2
automate: false
status: manually_verified
---

# TC-CART-003 — `POST /carrinhos` duplicate product in payload → 400

**Objective:** Confirm the API rejects a cart payload listing the same product id twice.

**Preconditions:** A logged-in user with no existing cart; a valid product id.

**Steps:**
1. `POST /carrinhos` with `produtos` containing the same `idProduto` twice.

**Expected result:** `400 Bad Request`, `{ "message": "Não é permitido possuir produto duplicado", "idProdutosDuplicados": ["<id>"] }`.

**Actual result (manually verified live, 2026-07-20):** PASS — exact message and `idProdutosDuplicados` array returned.

**Source grounding:** `ServeRest/ServeRest/src/controllers/carrinhos-controller.js` `exports.post` (`CART_WITH_DUPLICATE_PRODUCT`).
