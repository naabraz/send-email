module.exports = {
  moduleNameMapper: {
    '^config(.*)$': '<rootDir>/src/config$1',
    '^controller(.*)$': '<rootDir>/src/controller$1',
    '^helpers(.*)$': '<rootDir>/src/helpers$1',
    '^services(.*)$': '<rootDir>/src/services$1',
  },
  testMatch: [
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  collectCoverageFrom: [
    "src/**/**/*.ts",
  ]
}