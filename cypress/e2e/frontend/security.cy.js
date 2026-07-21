import LoginPage from '../../support/pages/LoginPage'
import { adminUserWithXssName } from '../../support/testData'
import { apiUrl } from '../../support/api'
import { REDIRECT_TIMEOUT_MS } from '../../support/constants'

describe('XSS sanitization @e2e @security', () => {
  let userId

  afterEach(() => {
    if (userId) {
      cy.deleteUser(userId)
      userId = null
    }
  })

  // Security: admin/home.js renders the logged-in admin's nome via plain
  // JSX interpolation ({nome}, not dangerouslySetInnerHTML) — confirmed by
  // reading ServeRestFront/src/views/admin/home.js. React auto-escapes
  // that by default, so an <img onerror=...> payload should render as
  // literal text, never as a real <img> element, and never execute.
  it('renders an XSS payload in the admin welcome message as literal text, not executed @regression @p1', () => {
    const user = adminUserWithXssName()

    cy.request('POST', apiUrl('/usuarios'), user).then((res) => {
      userId = res.body._id

      LoginPage.visit()

      cy.window().then((win) => {
        win.xssTriggered = false
      })

      LoginPage.fillEmail(user.email).fillPassword(user.password).submit()

      cy.url({ timeout: REDIRECT_TIMEOUT_MS }).should('include', '/admin/home')
      cy.contains('h1', 'Bem Vindo').should('contain.text', user.nome)
      cy.get('img[src="x"]').should('not.exist')
      cy.window().its('xssTriggered').should('eq', false)
    })
  })
})
