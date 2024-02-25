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
    "no-undef": string;
    "no-extra-semi": string;
    "no-template-curly-in-string": string;
    "no-caller": string;
    "no-control-regex": string;
    yoda: string;
    eqeqeq: string;
    "global-require": string;
    "brace-style": string;
    "eol-last": string;
    "no-extra-bind": string;
    "no-process-exit": string;
    "no-use-before-define": string;
    "no-unused-vars": (string | {
        args: string;
    })[];
    "no-unsafe-negation": string;
    "no-loop-func": string;
    indent: string;
    "no-console": string;
    "valid-jsdoc": (string | {
        prefer: {
            return: string;
            prop: string;
            memberof: string;
            class: string;
            inheritdoc: string;
            description: string;
            readonly: string;
        };
        preferType: {
            "*": string;
        };
        requireReturnType: boolean;
    })[];
    "node/no-unsupported-features": string;
    "node/no-deprecated-api": string;
    "node/no-missing-import": string;
    "node/no-missing-require": string;
    "node/no-unpublished-bin": string;
    "node/no-unpublished-require": string;
    "node/process-exit-as-throw": string;
};
export declare const overrides: {
    files: string[];
    env: {
        "jest/globals": boolean;
    };
}[];
