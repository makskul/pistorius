module.exports = {
    root: true,
    parserOptions: {
        sourceType: "module"
    },
    ignorePatterns: ['dist', 'static'],
    extends: [
        '@nuxtjs/eslint-config-typescript'
    ],
    rules: {
        'import/no-named-as-default': 0,
        'vue/no-v-html': 0,
        'vue/no-v-text-v-html-on-component': 0,
        'vue/multi-word-component-names': 0,
        'vue/require-default-prop': 0,
        'no-template-curly-in-string': 0
    }
}