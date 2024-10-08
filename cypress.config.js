const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "baseUrl": "https://www.amazon.com/",
    "viewportWidth": 1920,
    "viewportHeight": 1080,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
  },
});