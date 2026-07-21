import { disposableUser, disposableProduct } from '../../support/testData'
import { apiUrl } from '../../support/api'

describe('POST /produtos admin authorization @api @produtos', () => {
  let userId

  afterEach(() => {
    if (userId) {
      cy.deleteUser(userId)
      userId = null
    }
  })

  // TC-PRD-001 — Case A: no token
  it('rejects product creation with no token (401) @smoke @p0', () => {
    cy.request({
      method: 'POST',
      url: apiUrl('/produtos'),
      body: disposableProduct(),
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401)
      expect(res.body.message).to.eq(
        'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais',
      )
    })
  })

  // TC-PRD-001 — Case B: valid but non-admin token
  it('rejects product creation with a non-admin token (403) @regression @p0', () => {
    const user = disposableUser()

    cy.request('POST', apiUrl('/usuarios'), user).then((res) => {
      userId = res.body._id

      cy.request('POST', apiUrl('/login'), {
        email: user.email,
        password: user.password,
      }).then((loginRes) => {
        cy.request({
          method: 'POST',
          url: apiUrl('/produtos'),
          headers: { Authorization: loginRes.body.authorization },
          body: disposableProduct(),
          failOnStatusCode: false,
        }).then((prodRes) => {
          expect(prodRes.status).to.eq(403)
          expect(prodRes.body.message).to.eq('Rota exclusiva para administradores')
        })
      })
    })
  })
})
