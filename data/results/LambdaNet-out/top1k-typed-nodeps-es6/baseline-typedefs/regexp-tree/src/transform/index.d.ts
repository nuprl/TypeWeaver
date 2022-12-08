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
declare const _default: {
    TransformResult: typeof TransformResult;
    transform(regexp: any, handlers: any): TransformResult;
};
export default _default;
