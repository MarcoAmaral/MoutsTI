import LoginPage from '../../support/pages/LoginPage'
import { disposableUser } from '../../support/testData'
import { REDIRECT_TIMEOUT_MS } from '../../support/constants'

describe('Login @e2e @auth', () => {
  let userId

  afterEach(() => {
    if (userId) {
      cy.request('DELETE', `${Cypress.expose('apiUrl')}/usuarios/${userId}`)
      userId = null
    }
  })

  // TC-AUTH-001
  it('logs in with valid credentials and redirects to /home @smoke @p0', () => {
    const user = disposableUser()

    cy.request('POST', `${Cypress.expose('apiUrl')}/usuarios`, user).then((res) => {
      userId = res.body._id

      LoginPage.visit().login(user.email, user.password)

      cy.url({ timeout: REDIRECT_TIMEOUT_MS }).should('include', '/home')
      cy.contains('Logout').should('be.visible')
    })
  })

  // TC-AUTH-002
  it('shows an error and stays on /login with invalid credentials @regression @p0', () => {
    LoginPage.visit().login('qa.nonexistent.user@example.com', 'wrongpassword')

    cy.url().should('include', '/login')
    cy.contains('Email e/ou senha inválidos').should('be.visible')
  })
})
