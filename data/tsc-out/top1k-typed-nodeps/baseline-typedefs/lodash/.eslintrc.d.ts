declare const _extends: string[];
export { _extends as extends };
export declare const plugins: string[];
export declare namespace env {
    const es6: boolean;
    const node: boolean;
}
export declare namespace parserOptions {
    const ecmaVersion: number;
    const sourceType: string;
    namespace ecmaFeatures {
        const impliedStrict: boolean;
        const objectLiteralDuplicateProperties: boolean;
    }
}
export declare const rules: {
    'array-bracket-spacing': string[];
    camelcase: (string | {
        properties: string;
    })[];
    'comma-dangle': string[];
    curly: string[];
    'eol-last': string[];
    indent: (string | number | {
        SwitchCase: number;
    })[];
    'keyword-spacing': string[];
    'max-len': (string | {
        code: number;
        ignoreComments: boolean;
        ignoreRegExpLiterals: boolean;
    })[];
    'no-else-return': string[];
    'no-mixed-spaces-and-tabs': string[];
    'no-multiple-empty-lines': string[];
    'no-spaced-func': string[];
    'no-trailing-spaces': string[];
    'no-undef': string[];
    'no-unexpected-multiline': string[];
    'no-unused-vars': (string | {
        args: string;
        vars: string;
    })[];
    quotes: (string | {
        allowTemplateLiterals: boolean;
        avoidEscape: boolean;
    })[];
    semi: string[];
    'space-before-blocks': string[];
    'space-before-function-paren': string[];
    'space-in-parens': string[];
    'space-unary-ops': (string | {
        nonwords: boolean;
        overrides: {};
    })[];
    'arrow-body-style': (string | {
        requireReturnForObjectLiteral: boolean;
    })[];
    'arrow-parens': string[];
    'arrow-spacing': (string | {
        after: boolean;
        before: boolean;
    })[];
    'no-class-assign': string[];
    'no-const-assign': string[];
    'no-dupe-class-members': string[];
    'no-duplicate-imports': string[];
    'no-new-symbol': string[];
    'no-useless-rename': string[];
    'no-var': string[];
    'object-shorthand': (string | {
        avoidQuotes: boolean;
        ignoreConstructors: boolean;
    })[];
    'prefer-arrow-callback': (string | {
        allowNamedFunctions: boolean;
        allowUnboundThis: boolean;
    })[];
    'prefer-const': string[];
    'prefer-rest-params': string[];
    'prefer-template': string[];
    'template-curly-spacing': string[];
};
