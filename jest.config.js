module.exports = {
  preset: '@nuxt/test-utils',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: [
    'feature',
    'js',
    'vue',
    'json'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.(feature)$': 'cucumber-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/store/**/*js'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/node_modules/cucumber-jest/dist/init.js'
  ],
  testMatch: [
    '<rootDir>/test/bdd/features/**/*.feature',
    '<rootDir>/test/unit/**/*test.js'
  ]
}
