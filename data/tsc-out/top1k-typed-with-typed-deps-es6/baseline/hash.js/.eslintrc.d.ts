export declare namespace env {
    const browser: boolean;
    const commonjs: boolean;
    const node: boolean;
    const es6: boolean;
}
export declare namespace parserOptions {
    const ecmaVersion: number;
}
declare const _extends: string;
export { _extends as extends };
export declare const rules: {
    indent: (string | number | {
        FunctionDeclaration: {
            parameters: string;
        };
        FunctionExpression: {
            parameters: string;
        };
        CallExpression: {
            arguments: string;
        };
    })[];
    'linebreak-style': string[];
    quotes: string[];
    semi: string[];
};
