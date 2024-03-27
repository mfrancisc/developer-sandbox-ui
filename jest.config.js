/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/**/stories/*'],
  coverageDirectory: './coverage/',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(lodash-es|@redhat-cloud-services|@openshift|@patternfly|uuid))',
  ],
  transform: {
    '^.+\\.(ts|js)x?$': ['ts-jest'],
    '\\.(jpg|jpeg|png|gif|svg)$': [
      '<rootDir>/fileTransformer.js',
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/config/jest.setup.js'],
};
