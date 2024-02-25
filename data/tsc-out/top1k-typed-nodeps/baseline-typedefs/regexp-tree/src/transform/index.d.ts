export class TransformResult {
    constructor(ast: any, extra?: any);
    _ast: any;
    _source: any;
    _string: any;
    _regexp: RegExp;
    _extra: any;
    getAST(): any;
    setExtra(extra: any): void;
    getExtra(): any;
    toRegExp(): RegExp;
    getSource(): any;
    getFlags(): any;
    toString(): any;
}
export declare function transform(regexp: any, handlers: any): TransformResult;
