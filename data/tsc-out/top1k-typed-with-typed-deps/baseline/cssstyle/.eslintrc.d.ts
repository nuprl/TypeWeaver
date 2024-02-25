export declare const root: boolean;
declare const _extends: string[];
export { _extends as extends };
export declare namespace parserOptions {
    const ecmaVersion: number;
}
export declare namespace env {
    const es6: boolean;
}
export declare namespace globals {
    const exports: boolean;
    const module: boolean;
    const require: boolean;
    const window: boolean;
    const describe: boolean;
    const it: boolean;
    const test: boolean;
    const expect: boolean;
}
export declare const plugins: string[];
export declare const rules: {
    'no-prototype-builtins': string;
    'prettier/prettier': (string | {
        printWidth: number;
        singleQuote: boolean;
        trailingComma: string;
    })[];
    strict: string[];
};
export declare const overrides: ({
    files: string[];
    rules: {
        'prettier/prettier': string;
        'no-console'?: undefined;
    };
    env?: undefined;
} | {
    files: string;
    rules: {
        'no-console': string;
        'prettier/prettier'?: undefined;
    };
    env?: undefined;
} | {
    files: string[];
    env: {
        node: boolean;
    };
    rules?: undefined;
})[];
