module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,

  },
  rules: {
    'max-len': ['error', { code: 145 }],
    treatUndefinedAsUnspecified: 0,
    'linebreak-style': ['error', 'windows'],
  },
};