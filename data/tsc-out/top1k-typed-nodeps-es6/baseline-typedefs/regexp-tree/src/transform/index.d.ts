declare namespace _default {
    export { TransformResult };
    export function transform(regexp: any, handlers: any): TransformResult;
}
export default _default;
declare class TransformResult {
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
