declare const generator: any;
declare const parser: any;
declare const traverse: any;
declare class TransformResult {
    constructor(ast: any, extra?: any);
    getAST(): any;
    setExtra(extra: any): void;
    getExtra(): any;
    toRegExp(): any;
    getSource(): any;
    getFlags(): any;
    toString(): any;
}
