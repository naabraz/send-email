module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^config(.*)$': '<rootDir>/src/config$1',
    '^controller(.*)$': '<rootDir>/src/controller$1',
    '^helpers(.*)$': '<rootDir>/src/helpers$1',
    '^service(.*)$': '<rootDir>/src/service$1',
    '^types(.*)$': '<rootDir>/src/types$1',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/node_modules/**',
    '!src/config/**',
    '!**/coverage/**',
  ],
  setupFiles: [
    './jest.setup.js'
  ]
};
