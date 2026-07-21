const { defineConfig } = require('cypress')

module.exports = defineConfig({
  allowCypressEnv: false,
  video: false,
  screenshotOnRunFailure: true,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mocha',
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    setupNodeEvents(_on, config) {
      // One folder per run, so nothing gets overwritten and every
      // screenshot traces back to a single run. Accumulates between
      // runs; `npm install` wipes it via the postinstall clean:all script.
      const runId = new Date().toISOString().replace(/[:.]/g, '-')
      config.screenshotsFolder = `cypress/screenshots/${runId}`
      return config
    },
  },
  expose: {
    apiUrl: 'https://serverest.dev',
  },
})
