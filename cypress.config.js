const { defineConfig } = require('cypress')
const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress/configs', `${file}.json`)

  return fs.readJson(pathToConfigFile)
}

module.exports = defineConfig({
  chromeWebSecurity: false,
  execTimeout: 12000,
  env: {
    environmentName: 'DEV',
    name: 'develop',
    url: 'https://magento.softwaretestingboard.com/',
  },
  e2e: {
    setupNodeEvents(on, config) {
      const file = config.env.configFile || 'configQA'
      return getConfigurationByFile(file)
    },
    excludeSpecPattern: ['*.page.js', 'util.js'],
  },
})
