class LoginPage {
  visit() {
    cy.visit('/login')
    return this
  }

  fillEmail(email) {
    cy.getByTestId('email').type(email)
    return this
  }

  fillPassword(password) {
    cy.getByTestId('senha').type(password)
    return this
  }

  submit() {
    cy.getByTestId('entrar').click()
    return this
  }

  login(email, password) {
    this.fillEmail(email)
    this.fillPassword(password)
    this.submit()
  }
}

export default new LoginPage()
