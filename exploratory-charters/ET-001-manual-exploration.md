---
charter: ET-001
title: Manual exploration — auth, users, products, cart (live public instance)
date: 2026-07-20
tester: Marco Amaral — Senior QA
environment: https://serverest.dev (API) + https://front.serverest.dev (frontend), production public instance
duration: ~45 minutes
---

# ET-001 — Manual Exploration

## Mission

Verify, against the live public instance (not just the `ServeRest`/`front` source code), the exact status codes, error messages, and redirect behavior for the highest-risk flows (auth, user creation, admin authorization) — before writing automated assertions or formal test cases. Static source reading tells you what the code is supposed to do; this session confirms what the deployed app actually does.

All test data used below was disposable (throwaway emails with a timestamp suffix) and deleted immediately after each check — no residue left on the shared public instance.

## Session log

### API checks (`serverest.dev`)

| # | Action | Result | Matches source? |
|---|--------|--------|------------------|
| 1 | `POST /usuarios` with a new disposable email | `201` — `{"message":"Cadastro realizado com sucesso","_id":"..."}` | Yes |
| 2 | `POST /usuarios` again, same email | `400` — `{"message":"Este email já está sendo usado"}` | Yes |
| 3 | `POST /login` with the same credentials | `200` — `{"message":"Login realizado com sucesso","authorization":"Bearer ..."}` | Yes |
| 4 | `POST /login` with correct email, wrong password | `401` — `{"message":"Email e/ou senha inválidos"}` | Yes |
| 5 | `GET /usuarios/:id` with a malformed id (not 16 alphanumeric chars) | `400` — `{"id":"id deve ter exatamente 16 caracteres alfanuméricos"}` | **Finding — see below** |
| 6 | `GET /usuarios/:id` with a well-formed but non-existent id | `400` — `{"message":"Usuário não encontrado"}` | Yes, once id is well-formed |
| 7 | `POST /produtos` with no `Authorization` header | `401` — `{"message":"Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"}` | Yes |
| 8 | `POST /produtos` with a valid token from a **non-admin** user | `403` — `{"message":"Rota exclusiva para administradores"}` | Yes |
| 9 | Cleanup: `DELETE /usuarios/:id` for every disposable user created above | `200` — `{"message":"Registro excluído com sucesso"}` | Yes |

### Frontend checks (`front.serverest.dev`)

| # | Action | Result |
|---|--------|--------|
| 10 | Load `/login`, submit invalid credentials | Alert banner (closable, `×` button) reading "Email e/ou senha inválidos"; stays on `/login`, no redirect |
| 11 | Load `/login`, submit valid credentials for a disposable client user | Redirects to `/home` (client product listing, navbar with Home/Lista de Compras/Carrinho, Logout) |
| 12 | Load `/cadastrarusuarios`, submit a new disposable user | Auto-logs in and redirects straight to `/home` — registration and login are effectively one flow for a non-admin signup |
| 13 | Cleanup: disposable users from #11/#12 deleted via `DELETE /usuarios/:id` (looked up by email via `GET /usuarios?email=...`) | Confirmed removed |

Relevant `data-testid`s confirmed for automation selectors:
- Login: `email`, `senha`, `entrar`
- Register: `nome`, `email`, `password`, `checkbox`, `cadastrar`

## Findings

1. **No real defect found.** All behavior matches the `ServeRest`/`front` source exactly — the deployed public instance is in sync with the cloned repos.
2. **Validation-layering nuance (not a bug, but a scoping note for TC-USR-004):** `GET /usuarios/:id` has two distinct negative paths, not one:
   - A malformed id (wrong length/format) is rejected by a request-schema validator **before** it reaches the "does this user exist" business logic → `400` with a schema-shaped error (`{"id": "..."}`, no `message` key).
   - A well-formed id that simply doesn't exist in the datastore reaches the controller and returns the intended `USER_NOT_FOUND` business message (`400` with a `message` key).
   
   TC-USR-004 is written against the second case (well-formed, non-existent id) since that's the one exercising the actual business rule; the schema-validation case is a separate, lower-priority scenario (not currently in the coverage matrix, would be `P3` if added — the validator itself is generic infrastructure, not app-specific logic).
3. **Frontend cart is fully implemented**, contrary to the `front` repo's own stale README checklist (unchecked boxes there don't reflect current source). `AddToCartButton.js`, `cartButton.js`, `cart.js` all exist and function via `localStorage` + the `/carrinhos` API — corrected earlier assumption from README-only reading.
4. **Registration and login are effectively fused** in the client UI: successful signup immediately authenticates and redirects to `/home`, same destination as a direct login. Worth noting in TC-USR-001 so the automated assertion targets the right end state.

## Outcome

Proceeding to automate the 6 P0 scenarios with confidence — every assertion below is grounded in an actual observed response from the live instance, not an inference from source code alone.
