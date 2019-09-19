module.exports = {
    'env': {
        'browser': true,
        'es6': true
    },
    'extends': [
        // 'eslint:recommended', // NO THIS LINE !!!
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:prettier/recommended',
        'prettier/react',
        'prettier/standard'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        '@typescript-eslint',
        'prettier'
    ],
    'rules': {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'prettier/prettier': 'error'
    }
};