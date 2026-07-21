---
author: Marco Amaral — Senior QA
tc_id: TC-PRD-004
area: Produtos
type: Frontend
priority: P1
automate: false
status: manually_verified
---

# TC-PRD-004 — Admin: create a product via UI

**Objective:** Confirm an admin can create a product through the UI form and is redirected to the product list on success.

**Preconditions:** Logged in as admin.

**Steps:**
1. Navigate to `/admin/cadastrarprodutos`.
2. Fill `nome`, `preco`, `descricao`, `quantity` (`data-testid`s: `nome`, `preco`, `descricao`, `quantity`).
3. Click `Cadastrar` (`data-testid=cadastarProdutos`).

**Expected result:** Redirect to `/admin/listarprodutos` on success.

**Actual result (manually verified live, 2026-07-20):** PASS — redirected to `/admin/listarprodutos` after submission. Product cleaned up afterward via a temporary admin token.

**Source grounding:** `ServeRest/front/src/views/admin/registerProducts.js`, `ServeRest/ServeRest/src/controllers/produtos-controller.js` (`POST_SUCCESS`).
