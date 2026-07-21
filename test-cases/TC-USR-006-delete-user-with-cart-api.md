---
author: Marco Amaral — Senior QA
tc_id: TC-USR-006
area: Usuários
type: API
priority: P1
automate: false
status: manually_verified
---

# TC-USR-006 — `DELETE /usuarios/:id` blocked while user owns a cart → 400

**Objective:** Confirm a user cannot be deleted while they have an active cart — a data-integrity protection preventing orphaned cart records.

**Preconditions:** A user with an active cart (created via `POST /carrinhos`).

**Steps:**
1. Create a user, log in, create a cart for that user.
2. `DELETE https://serverest.dev/usuarios/<that user's id>`.

**Expected result:** `400 Bad Request`, `{ "message": "Não é permitido excluir usuário com carrinho cadastrado", "idCarrinho": "<cart id>" }`.

**Actual result (manually verified live, 2026-07-20):** PASS — exact message and `idCarrinho` returned. Cart cancelled and user deleted afterward as cleanup.

**Source grounding:** `ServeRest/ServeRest/src/controllers/usuarios-controller.js` `exports.delete` (`DELETE_USER_WITH_CART`).
