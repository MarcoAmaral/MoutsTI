import './commands'

// Cypress already screenshots on failure by default. When --expose captureAll=true
// is passed, also capture a screenshot after every test, pass or fail.
afterEach(function () {
  if (Cypress.expose('captureAll')) {
    cy.screenshot()
  }
})
