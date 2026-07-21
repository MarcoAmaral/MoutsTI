---
author: Marco Amaral — Senior QA
tc_id: TC-SEC-001
area: Segurança
type: Frontend
priority: P1
automate: true
status: automated
---

# TC-SEC-001 — XSS payload in admin `nome` renders as literal text, not executed

**Objective:** Confirm that a script-style payload stored as a user's `nome` cannot execute when rendered back in the UI — specifically on the admin welcome page (`/admin/home`), which greets the logged-in admin by name.

**Preconditions:** None.

**Test data:** Disposable admin user with `nome: '<img src=x onerror="window.xssTriggered = true">'`, `administrador: "true"`.

**Steps:**
1. `POST /usuarios` to register the admin user with the payload above as `nome`.
2. Log in via the UI (`/login`) with that user's credentials.
3. Land on `/admin/home`.

**Expected result:** The payload renders as literal, visible text inside the "Bem Vindo {nome}" heading — not as a real `<img>` element, and the `onerror` handler never fires.

**Actual result (verified live, 2026-07-21):** PASS — confirmed via automated run. The heading's text content contains the raw payload string; no `<img src="x">` element exists in the DOM; `window.xssTriggered` stayed `false`.

**Source grounding:** `ServeRestFront/src/views/admin/home.js` renders `{nome}` via plain JSX interpolation (not `dangerouslySetInnerHTML`), which React escapes by default. `ServeRestFront/src/services/validateUser.js`'s `validateLogin` sets `localStorage.setItem('serverest/userNome', element.nome)` and redirects admins to `/admin/home` — confirming this is a real, reachable render path for user-controlled data, not a hypothetical one.

**Why this is worth automating even though it passes:** a passing security test is still evidence of due diligence, not a no-op — it confirms the app's default framework behavior (React's escaping) actually holds for this specific data flow, rather than assuming it does.
