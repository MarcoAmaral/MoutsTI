// Public shared instance is occasionally slower than Cypress's 4000ms default
// command timeout on redirect-after-submit flows (login, registration).
export const REDIRECT_TIMEOUT_MS = 10000
