class RegisterPage {
  visit() {
    cy.visit('/cadastrarusuarios')
    return this
  }

  fillName(nome) {
    cy.getByTestId('nome').type(nome)
    return this
  }

  fillEmail(email) {
    cy.getByTestId('email').type(email)
    return this
  }

  fillPassword(password) {
    cy.getByTestId('password').type(password)
    return this
  }

  submit() {
    cy.getByTestId('cadastrar').click()
    return this
  }

  register(user) {
    this.fillName(user.nome)
    this.fillEmail(user.email)
    this.fillPassword(user.password)
    return this.submit()
  }
}

export default new RegisterPage()
