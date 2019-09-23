module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    // 'eslint:recommended', // NO THIS LINE !!!
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier/react',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // ecmaFeatures: {
    //   jsx: false
    // },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react-hooks', 'react', '@typescript-eslint', 'prettier'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'prettier/prettier': 'error',
    '@typescript-eslint/class-name-casing': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
