module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  // @see https://stackoverflow.com/a/69598249/3913343
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  }
};