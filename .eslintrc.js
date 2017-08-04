module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    "no-trailing-spaces": 0,
    "flowtype-errors/show-errors": 2,
    'allow-parens': 0,
    'generator-star-spacing': 0,
    'camelcase': 0
  },
  globals: {}
}
