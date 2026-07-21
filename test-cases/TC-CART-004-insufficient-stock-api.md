---
author: Marco Amaral — Senior QA
tc_id: TC-CART-004
area: Carrinhos
type: API
priority: P1
automate: false
status: manually_verified
---

# TC-CART-004 — `POST /carrinhos` insufficient stock → 400

**Objective:** Confirm the API rejects a cart request for more units than are in stock.

**Preconditions:** A logged-in user with no existing cart; a product with known, limited stock.

**Steps:**
1. `POST /carrinhos` requesting `quantidade` greater than the product's `quantidade` in stock.

**Expected result:** `400 Bad Request`, `{ "message": "Produto não possui quantidade suficiente", "item": { "idProduto", "quantidade", "quantidadeEstoque", "index" } }`.

**Actual result (manually verified live, 2026-07-20):** PASS — requested 999 units of a 3-in-stock product; exact message and item detail (stock=3) returned.

**Source grounding:** `ServeRest/ServeRest/src/services/produtos-service.js` `getPrecosUnitariosPorLote` (`INSUFFICIENT_STOCK`).
