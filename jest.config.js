const path = require('path');
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/test/fixtures'],
  coveragePathIgnorePatterns: ['<rootDir>/test/'],
  forceExit: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
