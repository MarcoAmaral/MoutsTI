import RegisterPage from '../../support/pages/RegisterPage'
import { disposableUser } from '../../support/testData'
import { REDIRECT_TIMEOUT_MS } from '../../support/constants'

describe('Register @e2e @usuarios', () => {
  let userId

  afterEach(() => {
    if (userId) {
      cy.request('DELETE', `${Cypress.expose('apiUrl')}/usuarios/${userId}`)
      userId = null
    }
  })

  // TC-USR-001
  it('registers a new user via UI and auto-logs in to /home @smoke @p0', () => {
    const user = disposableUser()

    RegisterPage.visit().register(user)

    cy.url({ timeout: REDIRECT_TIMEOUT_MS }).should('include', '/home')
    cy.contains('Logout').should('be.visible')

    cy.request('GET', `${Cypress.expose('apiUrl')}/usuarios?email=${user.email}`).then((res) => {
      userId = res.body.usuarios[0]._id
    })
  })
})
