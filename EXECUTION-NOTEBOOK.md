---
doc_kind: execution-notebook
feature: Execution Notebook — 6 P0 scenarios
tc_ids: [TC-AUTH-001, TC-AUTH-002, TC-USR-001, TC-USR-002, TC-USR-003, TC-PRD-001]
last_updated: 2026-07-21
---

# Execution Notebook — ServeRest QA Automation

| Field | Value |
|---|---|
| **Project** | ServeRest E2E + API automation (Senior QA Tester technical assignment, Mouts TI) |
| **Author** | Marco Amaral — Senior QA |
| **Date created** | 2026-07-21 |
| **Purpose** | Step-by-step manual execution procedures for the 6 automated (P0) scenarios — for onboarding, periodic manual re-verification, or audit-style sign-off evidence |

---

## What this is

This is a **manual execution notebook**: procedures detailed enough that any QA can run them without prior knowledge of ServeRest, one action at a time, and record a pass/fail result.

**How it relates to the other documents:**
- [`test-cases/TC-*.md`](test-cases/) — the formal test case specs (objective, preconditions, source grounding). These are the **what and why**.
- This notebook — the same 6 scenarios broken into individual clickable/callable steps with a result field to fill in. This is the **how**, for a human running it by hand.
- [`cypress/`](cypress/) (once implemented) — the automated version of the same 6 scenarios. Same assertions, machine-executed.

Every procedure below traces back to its source `TC-*` file and to the `ET-001` exploratory session line that first confirmed the expected behavior live.

**Scope:** only the 6 P0 scenarios that are in-scope for automation (3 E2E + 3 API — see [`TRACEABILITY-MATRIX.md`](TRACEABILITY-MATRIX.md)). The other 16 scenarios are documented in [`test-cases/`](test-cases/) and [`COVERAGE-MATRIX.md`](COVERAGE-MATRIX.md) but are not repeated here as manual procedures, to keep this notebook proportionate to what's actually being delivered.

## How to use this notebook

1. **Environment setup:** see [`TEST-STRATEGY.md`](TEST-STRATEGY.md) §2 for the target URLs and any local setup needed.
2. **Test data:** every procedure below creates disposable, timestamp-suffixed users (e.g. `qa.<timestamp>@example.com`). Delete anything you create as the last step of each procedure — do not leave residue on the shared public instance.
3. Execute each procedure in order. Record the actual result, status, and any observations in the fields provided.
4. Fill in the **Sign-off** section at the end once all procedures have been executed.

---

## Section A — Frontend (E2E)

### TC-AUTH-001 — Login with valid credentials → redirect to `/home`

**Precondition:** A registered client user exists (`administrador: "false"`). If you don't have one, register one first via `TC-USR-001` below, or via `POST /usuarios`.

**Steps:**
1. Navigate to `https://front.serverest.dev/login`.
2. Fill in the email field (`data-testid=email`) and password field (`data-testid=senha`) with the client user's credentials.
3. Click the `Entrar` button (`data-testid=entrar`).

**Expected result:** Redirected to `/home`, showing the client product listing, navbar (Home / Lista de Compras / Carrinho), and a Logout button.

**Actual result:** _______________________________________________

**Status:** ☐ PASS ☐ FAIL ☐ BLOCKED

**Observations:** _______________________________________________

---

### TC-AUTH-002 — Login with invalid credentials → error, no redirect

**Precondition:** None (credentials are expected to be invalid/non-existent).

**Steps:**
1. Navigate to `https://front.serverest.dev/login`.
2. Fill in the email and password fields with any non-existent email and an arbitrary password.
3. Click the `Entrar` button.

**Expected result:** Stays on `/login`; a closable alert banner appears reading "Email e/ou senha inválidos".

**Actual result:** _______________________________________________

**Status:** ☐ PASS ☐ FAIL ☐ BLOCKED

**Observations:** _______________________________________________

---

### TC-USR-001 — Register a new user via UI → success + redirect

**Precondition:** The email you use must not already be registered.

**Steps:**
1. Navigate to `https://front.serverest.dev/cadastrarusuarios`.
2. Fill in `nome`, `email`, `password` (`data-testid`s: `nome`, `email`, `password`) with disposable, unique values.
3. Leave the "Cadastrar como administrador?" checkbox (`data-testid=checkbox`) unchecked.
4. Click the `Cadastrar` button (`data-testid=cadastrar`).
5. **Cleanup:** delete the created user via `DELETE /usuarios/:id` (look up the id via `GET /usuarios?email=...` if needed).

**Expected result:** Registration succeeds and the user is auto-logged-in, landing directly on `/home` (same destination as a direct login) — there is no separate manual login step.

**Actual result:** _______________________________________________

**Status:** ☐ PASS ☐ FAIL ☐ BLOCKED

**Observations:** _______________________________________________

---

## Section B — API

### TC-USR-002 — `POST /usuarios` success

**Precondition:** The email you use must not already exist in the datastore.

**Steps:**
1. Send `POST https://serverest.dev/usuarios` with body:
   ```json
   { "nome": "...", "email": "qa.<timestamp>@example.com", "password": "Senha123!", "administrador": "false" }
   ```
2. **Cleanup:** delete the created user via `DELETE /usuarios/:id` using the `_id` returned above.

**Expected result:** `201 Created`, body `{ "message": "Cadastro realizado com sucesso", "_id": "<16-char id>" }`.

**Actual result:** _______________________________________________

**Status:** ☐ PASS ☐ FAIL ☐ BLOCKED

**Observations:** _______________________________________________

---

### TC-USR-003 — `POST /usuarios` duplicate email → 400

**Precondition:** A user with the target email already exists.

**Steps:**
1. Create a user via `POST /usuarios` (setup step — record its `_id` for cleanup).
2. Send `POST /usuarios` again with the same `email` (other fields may differ).
3. **Cleanup:** delete the setup user via `DELETE /usuarios/:id`.

**Expected result:** `400 Bad Request`, body `{ "message": "Este email já está sendo usado" }`.

**Actual result:** _______________________________________________

**Status:** ☐ PASS ☐ FAIL ☐ BLOCKED

**Observations:** _______________________________________________

---

### TC-PRD-001 — `POST /produtos` without admin rights → 401 / 403

**Precondition:** Case B requires a registered, non-admin user with a valid session token.

**Steps (Case A — no token):**
1. Send `POST https://serverest.dev/produtos` with any product payload and **no** `Authorization` header.

**Steps (Case B — non-admin token):**
1. Register and log in as a non-admin user (`POST /usuarios` then `POST /login`), capturing the Bearer token.
2. Send `POST https://serverest.dev/produtos` with any product payload and that token in the `Authorization` header.
3. **Cleanup:** delete the non-admin user via `DELETE /usuarios/:id`.

**Expected result:**
- Case A: `401 Unauthorized`, `{ "message": "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais" }`.
- Case B: `403 Forbidden`, `{ "message": "Rota exclusiva para administradores" }`.

**Actual result (Case A):** _______________________________________________

**Actual result (Case B):** _______________________________________________

**Status:** ☐ PASS ☐ FAIL ☐ BLOCKED

**Observations:** _______________________________________________

---

## Sign-off

| Field | Value |
|---|---|
| **Executed by** | _______________________________________________ |
| **Execution date** | _______________________________________________ |
| **Environment** | `front.serverest.dev` / `serverest.dev` (public instance) |
| **Total procedures** | 6 |
| **Passed** | ___ |
| **Failed** | ___ |
| **Blocked** | ___ |
| **Sign-off** | _______________________________________________ |
