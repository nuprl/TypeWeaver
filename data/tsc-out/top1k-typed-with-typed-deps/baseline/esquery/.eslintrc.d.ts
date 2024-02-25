export declare namespace env {
    const browser: boolean;
    const commonjs: boolean;
    const es6: boolean;
    const node: boolean;
}
declare const _extends: string;
export { _extends as extends };
export declare namespace globals {
    const Atomics: string;
    const SharedArrayBuffer: string;
}
export declare const overrides: ({
    files: string;
    parserOptions: {
        sourceType: string;
    };
    rules: {
        strict: string;
    };
    globals?: undefined;
    env?: undefined;
} | {
    files: string;
    globals: {
        assert: boolean;
    };
    env: {
        mocha: boolean;
    };
    parserOptions?: undefined;
    rules?: undefined;
})[];
export declare namespace parserOptions {
    const sourceType: string;
    const ecmaVersion: number;
}
export declare const rules: {
    semi: string[];
    indent: (string | number | {
        SwitchCase: number;
    })[];
    'prefer-const': string[];
    'no-var': string[];
    'prefer-destructuring': string[];
    'object-shorthand': string[];
    'object-curly-spacing': string[];
    quotes: string[];
    'quote-props': string[];
    'brace-style': (string | {
        allowSingleLine: boolean;
    })[];
    'prefer-template': string[];
};
