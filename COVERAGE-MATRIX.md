# Coverage Matrix — ServeRest QA Automation

**Author:** Marco Amaral — Senior QA

All 22 scenarios identified during source review (`ServeRest/ServeRest`, `ServeRest/front`) and live exploration (`ET-001`), scored by risk (**Likelihood × Impact**, 1–5 each) and prioritized per the scale in `TEST-STRATEGY.md` §3.

Every scenario here has a corresponding formal test case in [`test-cases/`](test-cases/) — including the 16 that aren't automated. "Documented" is not "designed on paper only": each was manually executed at least once against the live public instance, with the result recorded in its `TC-*.md` file.

| ID | Area | Type | Scenario | +/− | L | I | Score | Priority | Automate? | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| TC-USR-002 | Usuários | API | `POST /usuarios` success | + | 5 | 5 | 25 | **P0** | ✅ Yes | Planned² |
| TC-AUTH-001 | Auth | Frontend | Login (client, valid) → redirect | + | 4 | 5 | 20 | **P0** | ✅ Yes | Planned² |
| TC-USR-003 | Usuários | API | `POST /usuarios` duplicate email → 400 | − | 4 | 5 | 20 | **P0** | ✅ Yes | Planned² |
| TC-AUTH-002 | Auth | Frontend | Login (invalid) → error, no redirect | − | 4 | 4 | 16 | **P0** | ✅ Yes | Planned² |
| TC-USR-001 | Usuários | Frontend | Register user via UI → success + redirect | + | 4 | 4 | 16 | **P0** | ✅ Yes | Planned² |
| TC-PRD-001 | Produtos | API | `POST /produtos` without admin rights → 401/403 | − | 3 | 5 | 15 | **P0** | ✅ Yes | Planned² |
| TC-AUTH-003 | Auth | Frontend | Login (admin, valid) → redirect | + | 3 | 4 | 12 | P1 | No | Manually verified |
| TC-CART-001 | Carrinhos | API | `POST /carrinhos` success | + | 3 | 4 | 12 | P1 | No | Manually verified |
| TC-AUTH-004 | Auth | API | `POST /login` valid → 200 + token | + | 3 | 4 | 12 | P1¹ | No | Manually verified |
| TC-AUTH-005 | Auth | API | `POST /login` invalid → 401 | − | 3 | 4 | 12 | P1¹ | No | Manually verified |
| TC-USR-004 | Usuários | API | `GET /usuarios/:id` well-formed, non-existent → 400 | − | 3 | 3 | 9 | P1 | No | Manually verified |
| TC-PRD-002 | Produtos | API | `POST /produtos` duplicate name → 400 | − | 3 | 3 | 9 | P1 | No | Manually verified |
| TC-PRD-004 | Produtos | Frontend | Admin: create product via UI | + | 3 | 3 | 9 | P1 | No | Manually verified |
| TC-CART-004 | Carrinhos | API | `POST /carrinhos` insufficient stock → 400 | − | 3 | 3 | 9 | P1 | No | Manually verified |
| TC-USR-006 | Usuários | API | `DELETE /usuarios/:id` blocked while user owns a cart → 400 | − | 2 | 4 | 8 | P1 | No | Manually verified |
| TC-USR-005 | Usuários | API | `PUT /usuarios/:id` duplicate email → 400 | − | 2 | 3 | 6 | P2 | No | Manually verified |
| TC-USR-007 | Usuários | Frontend | Admin: list/delete users via UI | + | 2 | 3 | 6 | P2 | No | Manually verified |
| TC-PRD-003 | Produtos | API | `DELETE /produtos/:id` blocked while in a cart → 400 | − | 2 | 3 | 6 | P2 | No | Manually verified |
| TC-CART-002 | Carrinhos | API | `POST /carrinhos` blocked, user already has a cart → 400 | − | 2 | 3 | 6 | P2 | No | Manually verified |
| TC-CART-003 | Carrinhos | API | `POST /carrinhos` duplicate product in payload → 400 | − | 2 | 3 | 6 | P2 | No | Manually verified |
| TC-CART-006 | Carrinhos | Frontend | Client: browse products, add to list | + | 2 | 2 | 4 | P2 | No | Manually verified |
| TC-CART-005 | Carrinhos | API | `DELETE /carrinhos/concluir-compra` with no cart → 200 | + | 1 | 2 | 2 | P3 | No | Manually verified |

¹ Scored 12 by the raw formula, but deliberately not selected among the automated 6: the same `/login` contract (valid + invalid credentials) is already exercised end-to-end by `TC-AUTH-001`/`TC-AUTH-002` through the UI, which calls the identical API underneath. A standalone API-level login test would be marginally useful as a contract check but is redundant coverage, not missing coverage — documented and manually verified instead of automated, to avoid testing the same behavior twice for the sake of a round number.

² **Planned, not yet implemented** — the exact expected behavior for all 6 was verified live in `ET-001` and the risk/priority analysis is final, but the Cypress specs themselves haven't been written yet. Updating this to "Automated" the moment each spec exists and passes — not before, per this project's verification-honesty rule (no "done" claims without evidence).

## Summary

| Priority | Count | Automated |
|---|---|---|
| P0 (Critical) | 6 | 0 / 6 (planned, specs not yet written) |
| P1 (High) | 9 | 0 / 9 (manually verified) |
| P2 (Medium) | 6 | 0 / 6 (manually verified) |
| P3 (Low) | 1 | 0 / 1 (manually verified) |
| **Total** | **22** | **22 / 22 documented + executed at least once; 6 planned for automation, 0 implemented so far** |

See [`TRACEABILITY-MATRIX.md`](TRACEABILITY-MATRIX.md) for how the 6 automated scenarios map from risk → business rule → spec file.
