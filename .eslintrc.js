module.exports = {
    'env': {
        'browser': true,
        'es2020': true,
        'node': true,
        'commonjs': true
    },
    parser: 'babel-eslint',
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 11,
        'sourceType': 'module'
    },
    'rules': {
        'semi': ['warn', 'never'],
        'quotes': ['warn', 'single']
    }
}
