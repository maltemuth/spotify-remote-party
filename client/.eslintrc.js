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
    // make eslint recognize these filename extensions instead complaining about missing extensions
    'import/extensions': [2, { extensions: ['.js', '.ts', '.tsx'] }],
    // recognize these as JSX filename extensions
    'react/jsx-filename-extension': [2, { extensions: ['.ts', '.tsx', '.js'] }],
    // eslint cannot simply `import React from 'react'` with typescript ...
    'no-use-before-define': 0,
    // ... but tslint can.
    '@typescript-eslint/no-use-before-define': 2,
    // we're not using prop-types, but typescript interfaces instead
    'react/prop-types': 0,
    // no use for this rule, to be honest
    'react/jsx-one-expression-per-line': 0,
    // again, eslint cannot detect typescript interface / type / namespace usage ...
    'no-unused-vars': 'off',
    // .. but tslint can.
    '@typescript-eslint/no-unused-vars': ['error'],
  },
  settings: {
    // as above, make the eslint importer recognize more than just .js
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
