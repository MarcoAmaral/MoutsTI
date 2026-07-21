---
author: Marco Amaral — Senior QA
tc_id: TC-CART-006
area: Carrinhos
type: Frontend
priority: P2
automate: false
status: manually_verified
---

# TC-CART-006 — Client: browse products, add to list

**Objective:** Confirm a client user can add a product to their shopping list from the home product grid.

**Preconditions:** Logged in as a client user.

**Steps:**
1. On `/home`, click `Adicionar a lista` (`data-testid=adicionarNaLista`) on any product.

**Expected result:** Redirect to `/minhaListaDeProdutos`, showing the selected product with quantity controls and an "Adicionar no carrinho" action.

**Actual result (manually verified live, 2026-07-20):** PASS — product appeared in "Lista de Compras" with price, quantity=1, and +/− controls.

**Source grounding:** `ServeRest/front/src/component/AddToCartButton.js`, `ServeRest/front/src/services/cart.js`.
