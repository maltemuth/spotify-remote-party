module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'import/extensions': [2, { extensions: ['.js', '.ts', '.tsx'] }],
    'react/jsx-filename-extension': [2, { extensions: ['.ts', '.tsx', '.js'] }],
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 2,
    'react/prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
