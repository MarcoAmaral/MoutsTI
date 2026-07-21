---
author: Marco Amaral — Senior QA
tc_id: TC-USR-001
area: Usuários
type: Frontend
priority: P0
automate: true
status: planned
---

# TC-USR-001 — Register a new user via UI → success + redirect

**Objective:** Confirm a new user can self-register through the UI and is authenticated immediately, without a separate manual login step.

**Preconditions:** The email used must not already be registered.

**Test data:** Disposable user — unique `nome`/`email`/`password`, `administrador` unchecked.

**Steps:**
1. Navigate to `/cadastrarusuarios`.
2. Fill `nome`, `email`, `password` (`data-testid`s: `nome`, `email`, `password`).
3. Leave the "Cadastrar como administrador?" checkbox (`data-testid=checkbox`) unchecked.
4. Click `Cadastrar` (`data-testid=cadastrar`).

**Expected result:** Registration succeeds and the user is auto-logged-in, landing on `/home` (same destination as a direct login) — registration and login are effectively one fused flow for the client role.

**Actual result (verified live, 2026-07-20, `ET-001` #12):** PASS — redirected straight to `/home` with the new session active.

**Source grounding:** `ServeRest/front/src/views/registerUser.js`, `ServeRest/ServeRest/src/controllers/usuarios-controller.js` (`POST_SUCCESS`).
