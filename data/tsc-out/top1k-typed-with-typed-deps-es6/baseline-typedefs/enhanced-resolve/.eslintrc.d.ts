export declare const root: boolean;
export declare const plugins: string[];
declare const _extends: string[];
export { _extends as extends };
export declare namespace env {
    const node: boolean;
    const es6: boolean;
}
export declare namespace parserOptions {
    const ecmaVersion: number;
}
export declare const rules: {
    "prettier/prettier": string;
    "no-template-curly-in-string": string;
    "no-caller": string;
    "no-control-regex": string;
    yoda: string;
    eqeqeq: string;
    "eol-last": string;
    "no-extra-bind": string;
    "no-process-exit": string;
    "no-use-before-define": string;
    "no-unused-vars": (string | {
        args: string;
        ignoreRestSiblings: boolean;
    })[];
    "no-loop-func": string;
    "node/no-missing-require": string;
    "jsdoc/check-indentation": string;
    "jsdoc/check-param-names": string;
    "jsdoc/check-property-names": string;
    "jsdoc/check-tag-names": string;
    "jsdoc/require-hyphen-before-param-description": string[];
    "jsdoc/require-param-description": string;
    "jsdoc/require-param-name": string;
    "jsdoc/require-param-type": string;
    "jsdoc/require-param": string;
    "jsdoc/require-property": string;
    "jsdoc/require-property-name": string;
    "jsdoc/require-property-type": string;
    "jsdoc/require-returns-description": string;
    "jsdoc/require-returns-type": string;
    "jsdoc/require-returns": string;
};
export declare namespace settings {
    namespace jsdoc {
        const mode: string;
        namespace tagNamePreference {
            const _extends_1: string;
            export { _extends_1 as extends };
            const _return: string;
            export { _return as return };
            export const constructor: string;
            export const prop: string;
            export const arg: string;
            export const augments: string;
            export const description: boolean;
            export const desc: boolean;
            export const inheritdoc: boolean;
            const _class: string;
            export { _class as class };
        }
        const overrideReplacesDocs: boolean;
    }
}
export declare const overrides: {
    files: string[];
    env: {
        mocha: boolean;
    };
}[];
