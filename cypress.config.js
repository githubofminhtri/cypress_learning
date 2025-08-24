const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      baseUrl: 'https://www.automationexercise.com/'
    },
    reporter: 'mochawesome',
    reporterOptions: {
      overwrite: false,
      html: false,
      json: true,
      reportDir: process.env.MOCHA_DIR || 'cypress/reports/default',
    }
  },
});
