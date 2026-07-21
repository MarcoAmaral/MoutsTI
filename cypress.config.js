const { defineConfig } = require('cypress')

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
    setupNodeEvents(_on, config) {
      // One folder per run (all specs in this run share it), so nothing
      // gets deleted or overwritten and every file traces back to a
      // single run. Videos/screenshots accumulate here between runs;
      // `npm install` wipes them via the postinstall clean:all script.
      const runId = new Date().toISOString().replace(/[:.]/g, '-')
      config.videosFolder = `cypress/videos/${runId}`
      config.screenshotsFolder = `cypress/screenshots/${runId}`
      return config
    },
  },
  expose: {
    apiUrl: 'https://serverest.dev',
  },
})
