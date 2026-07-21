const { defineConfig } = require('cypress')
const fs = require('fs')

module.exports = defineConfig({
  allowCypressEnv: false,
  video: true,
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
    setupNodeEvents(on, config) {
      // Default: keep the video only for specs with failures.
      // Pass --expose captureAll=true to keep every run's video regardless of outcome.
      on('after:spec', (_spec, results) => {
        if (config.expose && config.expose.captureAll) return
        if (results && results.video && results.stats.failures === 0) {
          fs.unlinkSync(results.video)
        }
      })
      return config
    },
  },
  expose: {
    apiUrl: 'https://serverest.dev',
  },
})
