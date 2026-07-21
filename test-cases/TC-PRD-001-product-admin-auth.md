---
author: Marco Amaral — Senior QA
tc_id: TC-PRD-001
area: Produtos
type: API
priority: P0
automate: true
status: automated
---

# TC-PRD-001 — `POST /produtos` without admin rights → 401 / 403

**Objective:** Confirm the admin-only write authorization on `/produtos` is enforced, covering both the "no token" and "valid but non-admin token" cases — this tests real authorization logic, not just CRUD behavior.

**Preconditions:** Case B requires a registered, non-admin user with a valid session token.

**Test data:** Any product payload; Case B additionally needs a non-admin user's Bearer token.

**Steps (Case A — no token):**
1. `POST https://serverest.dev/produtos` with a product payload and **no** `Authorization` header.

**Steps (Case B — non-admin token):**
1. Register and log in as a non-admin user, capturing the Bearer token.
2. `POST https://serverest.dev/produtos` with a product payload and that token in `Authorization`.

**Expected result:**
- Case A: `401 Unauthorized`, `{ "message": "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais" }`.
- Case B: `403 Forbidden`, `{ "message": "Rota exclusiva para administradores" }`.

**Actual result (verified live, 2026-07-20, `ET-001` #7–8):** PASS on both cases — exact messages and status codes matched. Disposable non-admin user cleaned up after.

**Source grounding:** `ServeRest/ServeRest/src/middlewares/authentication-middleware.js` (`checkAdm` → `INVALID_TOKEN`, `REQUIRED_ADMIN`).
