import { apiUrl } from './api'

Cypress.Commands.add('getByTestId', (testId) => cy.get(`[data-testid="${testId}"]`))

Cypress.Commands.add('deleteUser', (id) => cy.request('DELETE', apiUrl(`/usuarios/${id}`)))
