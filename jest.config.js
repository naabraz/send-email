module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^config(.*)$': '<rootDir>/config$1',
    '^controller(.*)$': '<rootDir>/src/controller$1',
    '^helpers(.*)$': '<rootDir>/helpers$1',
    '^service(.*)$': '<rootDir>/src/service$1',
    '^types(.*)$': '<rootDir>/src/types$1',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/config/**',
    '!**/index.ts',
    '!src/controller/index.ts',
    '!**/helpers/logger/**',
    '!**/node_modules/**',
    '!**/coverage/**',
  ],
  setupFiles: [
    './jest.setup.js'
  ]
};
