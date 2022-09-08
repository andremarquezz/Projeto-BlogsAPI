module.exports = {
  verbose: true,
  testMatch: ['**/src/**/*.test.js'],
  testTimeout: 180000,
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    'src/database/*',
    'src/routes/*',
    'src/errors/ErrorInternalServer.js',
    'src/api.js',
  ],
};
