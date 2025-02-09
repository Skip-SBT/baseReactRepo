let namePattern = /[a-z][a-zA-Z\d]*(?:-[a-z][a-zA-Z\d]*)*/u;

module.exports = {
    plugins: [
        'stylelint-scss',
        'stylelint-prettier',
    ],
    extends: [
        'stylelint-config-standard',
        'stylelint-config-standard-scss',
        'stylelint-prettier/recommended',
    ],
    rules:   {
        'alpha-value-notation':                   null,
        'at-rule-no-unknown':                     null,
        'color-function-notation':                'legacy',
        'color-hex-length':                       'long',
        'comment-empty-line-before':              null,
        'declaration-empty-line-before':          null,
        'function-url-quotes':                    null,
        'keyframes-name-pattern':                 namePattern,
        'no-descending-specificity':              null,
        'no-duplicate-selectors':                 null,
        'property-no-vendor-prefix':              null,
        'selector-attribute-quotes':              'always',
        'selector-class-pattern':                 namePattern,
        'shorthand-property-no-redundant-values': null,

        // https://gitlab.andeo.ch/andeo/janframework/code-quality/-/issues/10
        'function-no-unknown': null,

        // Prettier rules
        'prettier/prettier': [
            true,
            {
                endOfLine:              "lf",
                printWidth:             160,
                singleAttributePerLine: false,
                singleQuote:            true,
            },
        ],

        // SCSS rules
        'scss/at-rule-no-unknown':                     true,
        'scss/dollar-variable-empty-line-before':      null,
        'scss/double-slash-comment-empty-line-before': null,
    },
};
