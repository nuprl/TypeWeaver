declare const generator: string;
declare const parser: string;
declare const traverse: string;
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
