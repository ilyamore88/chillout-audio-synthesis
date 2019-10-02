module.exports = {
  extends: [
    'plugin:vue/recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  overrides: [
    {
      files: [ '*.vue' ],
      rules: {
        indent: 'off',
        'vue/script-indent': [
          'warn', 2, { baseIndent: 1 }
        ]
      }
    }
  ],
  parserOptions: {
    parser: 'babel-eslint'
  }
};