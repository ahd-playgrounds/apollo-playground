module.exports = {
    extends: ['airbnb', 'prettier'],
    rules: {
        'func-names': 'off',
        'prettier/prettier': 'error',
    },
    plugins: ['prettier'],
    env: {
        browser: true,
        node: true,
        jest: true
    },
    settings: {}
}
