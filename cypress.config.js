
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    
    baseUrl: 'https://staging.trymima.com/',
    chromeWebSecurity: false,
    viewportHeight: 960,
    viewportWidth: 1530,
    defaultCommandTimeout: 50000,
    pageLoadTimeout: 50000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
