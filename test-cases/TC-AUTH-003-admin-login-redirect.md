---
author: Marco Amaral — Senior QA
tc_id: TC-AUTH-003
area: Auth
type: Frontend
priority: P1
automate: false
status: manually_verified
---

# TC-AUTH-003 — Login with valid credentials (admin) → redirect

**Objective:** Confirm an admin user is redirected to the admin area, not the client home, distinguishing role-based routing from `TC-AUTH-001`.

**Preconditions:** A registered admin user exists (`administrador: "true"`).

**Steps:**
1. Navigate to `/login`.
2. Fill valid admin credentials.
3. Click `Entrar`.

**Expected result:** Redirect to `/admin/home`, showing the admin navbar (Home, Cadastrar Usuários, Listar Usuários, Cadastrar Produtos, Listar Produtos, Relatórios) and a welcome heading with the user's name.

**Actual result (manually verified live, 2026-07-20):** PASS — redirected to `/admin/home` with the expected navbar and "Bem Vindo `<nome>`" heading.

**Source grounding:** `ServeRest/front/src/services/validateUser.js` (`administrador === 'true'` → `/admin/home`).
