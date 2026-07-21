---
author: Marco Amaral — Senior QA
tc_id: TC-USR-002
area: Usuários
type: API
priority: P0
automate: true
status: automated
---

# TC-USR-002 — `POST /usuarios` success

**Objective:** Confirm the API creates a new user and returns the expected success contract.

**Preconditions:** The email used must not already exist in the datastore.

**Test data:** `{ "nome": "...", "email": "qa.<timestamp>@example.com", "password": "Senha123!", "administrador": "false" }`

**Steps:**
1. `POST https://serverest.dev/usuarios` with the payload above.

**Expected result:** `201 Created`, body `{ "message": "Cadastro realizado com sucesso", "_id": "<16-char id>" }`.

**Actual result (verified live, 2026-07-20, `ET-001` #1):** PASS — exact message and a 16-char `_id` returned. Cleaned up via `DELETE /usuarios/:id` immediately after.

**Source grounding:** `ServeRest/ServeRest/src/controllers/usuarios-controller.js` `exports.post`, `src/utils/constants.js` (`POST_SUCCESS`).
