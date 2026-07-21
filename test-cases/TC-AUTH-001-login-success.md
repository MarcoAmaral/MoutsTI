---
author: Marco Amaral — Senior QA
tc_id: TC-AUTH-001
area: Auth
type: Frontend
priority: P0
automate: true
status: automated
---

# TC-AUTH-001 — Login with valid credentials (client) → redirect

**Objective:** Confirm a registered, non-admin user can log in via the UI and is redirected to the client home.

**Preconditions:** A registered client user exists (`administrador: "false"`).

**Test data:** Disposable user, e.g. `qa.<timestamp>@example.com` / `Senha123!`.

**Steps:**
1. Navigate to `/login`.
2. Fill `email` (`data-testid=email`) and `senha` (`data-testid=senha`).
3. Click `Entrar` (`data-testid=entrar`).

**Expected result:** Redirect to `/home`, showing the client product listing, navbar (Home / Lista de Compras / Carrinho), and a Logout button.

**Actual result (verified live, 2026-07-20, `ET-001` #11):** PASS — redirected to `/home` exactly as expected.

**Source grounding:** `ServeRest/front/src/services/login.js`, `ServeRest/ServeRest/src/controllers/login-controller.js` (`LOGIN_SUCCESS`).
