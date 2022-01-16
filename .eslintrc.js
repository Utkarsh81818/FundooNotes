module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    allowElseIf: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
  },

  rules: {
    'quotes': ['error', 'single'],
    // we want to force semicolons
    'semi': ['error', 'always'],
    // we use 2 spaces to indent our code
    'indent': ['error', 2],
    // we want to avoid extraneous spaces
    'no-multi-spaces': ['error']
  },
};