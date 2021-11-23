module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-classes-per-file': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'prefer-const': 'off',
    'no-unused-expressions': 'off',
    'no-underscore-dangle': 'off',
  },
};
