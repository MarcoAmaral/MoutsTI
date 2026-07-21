---
author: Marco Amaral — Senior QA
tc_id: TC-USR-009
area: Usuários
type: API
priority: P2
automate: true
status: automated
---

# TC-USR-009 — `POST /usuarios` accepts a trivially weak password (characterization test)

**Objective:** Document that ServeRest enforces no password complexity or length rule at all, rather than silently assuming the API is secure by default. This is a characterization test — it pins the *actual* behavior, not the *secure* behavior the API should have, since ServeRest is third-party source not owned/fixable here.

**Preconditions:** None.

**Test data:** `{ "nome": "...", "email": "qa.<timestamp>@example.com", "password": "a", "administrador": "false" }` — a single-character password.

**Steps:**
1. `POST https://serverest.dev/usuarios` with the payload above.

**Expected result (documented finding, not a security recommendation being enforced):** `201 Created` — the API has no rule to reject this.

**Actual result (verified live, 2026-07-21):** PASS (as a characterization test) — confirmed `201 Created`, `{ "message": "Cadastro realizado com sucesso", "_id": "<16-char id>" }`. Also confirmed the API accepts `administrador: "true"` from an unauthenticated request (self-service admin registration) — very likely intentional given ServeRest is a public training API meant for practicing tests against admin-gated endpoints without needing a seeded admin account, not a hidden defect. Cleaned up via `DELETE /usuarios/:id` immediately after.

**Source grounding:** `ServeRest/ServeRest/src/models/usuarios-model.js` `exports.schemaPost` — `password: Joi.string().required()`, no `.min()`, no complexity regex.

**Why not scored/prioritized in `COVERAGE-MATRIX.md`'s risk table:** this isn't a coverage gap in our test suite to prioritize automating — it's a finding about ServeRest's own validation, already fully captured by the one test that exists. See `COVERAGE-MATRIX.md`'s "Additional tests beyond the original 22" section and `TEST-STRATEGY.md` for the full reasoning behind asserting the observed (201) rather than the desired (400) status.
