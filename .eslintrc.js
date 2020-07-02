module.exports = {
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parser: 'babel-eslint',
    env: { browser: true, es6: true, node: true, commonjs: true, "jest/globals": true },
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: ['react-hooks', 'eslint-plugin-react', "jest"],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 0,
      'no-console': [1, { allow: ['warn', 'error'] }],
      'no-unused-expressions': 'off',
      eqeqeq: ['error', 'always'],
      'no-unused-vars': [
        'warn',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
      ],
      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: false,
        },
      ],
    },
  }
  