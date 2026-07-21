---
author: Marco Amaral — Senior QA
tc_id: TC-CART-002
area: Carrinhos
type: API
priority: P2
automate: false
status: manually_verified
---

# TC-CART-002 — `POST /carrinhos` blocked, user already has a cart → 400

**Objective:** Confirm the one-cart-per-user limit is enforced.

**Preconditions:** The user already has an active cart.

**Steps:**
1. Create a cart for the user (setup).
2. `POST /carrinhos` again with the same user's token.

**Expected result:** `400 Bad Request`, `{ "message": "Não é permitido ter mais de 1 carrinho" }`.

**Actual result (manually verified live, 2026-07-20):** PASS — exact message returned on the second attempt.

**Source grounding:** `ServeRest/ServeRest/src/controllers/carrinhos-controller.js` `exports.post` (`LIMIT_JUST_ONE_CART`).
