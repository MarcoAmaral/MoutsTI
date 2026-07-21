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

  // TC-USR-009 — known gap, not yet fixed by ServeRest: no password
  // complexity/length enforcement. API currently returns 201 for a
  // 1-char password; asserting the secure expected behavior (400) so
  // this fails loudly until it's addressed, rather than silently
  // passing on incorrect behavior. Live-verified during this session.
  it('rejects a trivially weak password with 400 @regression @p2 @known-issue', () => {
    const user = userWithWeakPassword()

    cy.request({
      method: 'POST',
      url: apiUrl('/usuarios'),
      body: user,
      failOnStatusCode: false,
    }).then((res) => {
      userId = res.body._id

      expect(res.status).to.eq(400)
    })
  })
})
