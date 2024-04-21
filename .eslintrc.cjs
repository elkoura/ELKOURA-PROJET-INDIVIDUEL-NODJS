/** @type {import("eslint").Linter.Config} */
const config = {
  env: {
    node: true
  },
  parserOptions: {
    sourceType: "commonjs",
    ecmaVersion: "latest"
  },
  extends: ["plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": ["error"]
  }
};

module.exports = config;
