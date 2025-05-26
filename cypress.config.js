
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    
    baseUrl: 'https://staging.trymima.com/',
    chromeWebSecurity: false,
    viewportHeight: 960,
    viewportWidth: 1530,
    defaultCommandTimeout: 50000,
    pageLoadTimeout: 50000,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
