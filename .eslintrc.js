module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  rules: {
    quotes: ["error", "single"]
  }
};