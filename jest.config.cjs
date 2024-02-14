module.exports = {
  testTimeout: 70000,
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  // @see https://stackoverflow.com/a/69598249/3913343
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
