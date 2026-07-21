import { disposableUser, userWithWeakPassword } from '../../support/testData'
import { apiUrl } from '../../support/api'

describe('POST /usuarios @api @usuarios', () => {
  let userId

  afterEach(() => {
    if (userId) {
      cy.deleteUser(userId)
      userId = null
    }
  })

  // TC-USR-002
  it('creates a user successfully @smoke @p0', () => {
    const user = disposableUser()

    cy.request('POST', apiUrl('/usuarios'), user).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body.message).to.eq('Cadastro realizado com sucesso')
      expect(res.body._id).to.match(/^[a-zA-Z0-9]{16}$/)
      userId = res.body._id
    })
  })

  // TC-USR-003
  it('rejects duplicate email with 400 @regression @p0', () => {
    const user = disposableUser()

    cy.request('POST', apiUrl('/usuarios'), user).then((res) => {
      userId = res.body._id

      cy.request({
        method: 'POST',
        url: apiUrl('/usuarios'),
        body: user,
        failOnStatusCode: false,
      }).then((dupRes) => {
        expect(dupRes.status).to.eq(400)
        expect(dupRes.body.message).to.eq('Este email já está sendo usado')
      })
    })
  })

  // TC-USR-009 — characterization test, not a bug fix: pins the *actual*
  // API behavior rather than the secure behavior it should have. ServeRest
  // enforces no password complexity/length at all (a 1-char password is
  // accepted, 201) — we don't own ServeRest's source to fix this, so this
  // documents the finding instead of asserting desired-but-false behavior.
  // If this ever starts failing, the underlying behavior changed and this
  // finding needs revisiting. Live-verified during this session; full
  // context in TEST-STRATEGY.md.
  it('documents that a trivially weak password is currently accepted (known gap) @regression @p2 @known-issue', () => {
    const user = userWithWeakPassword()

    cy.request('POST', apiUrl('/usuarios'), user).then((res) => {
      userId = res.body._id

      expect(res.status).to.eq(201)
    })
  })
})
