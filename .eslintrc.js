module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'codex'
  ],
  rules: {
    'prefer-const': ['error', {
      destructuring: 'all',
      ignoreReadBeforeAssign: false
    } ],
    'dot-notation': 'off'
  }
};