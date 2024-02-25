/**
 * Transform result.
 */
export class TransformResult {
    /**
     * Initializes a transform result for an AST.
     *
     * @param Object ast - an AST node
     * @param mixed extra - any extra data a transform may return
     */
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
/**
 * Transforms a regular expression applying a set of
 * transformation handlers.
 *
 * @param string | AST | RegExp:
 *
 *   a regular expression in different representations: a string,
 *   a RegExp object, or an AST.
 *
 * @param Object | Array<Object>:
 *
 *   a handler (or a list of handlers) from `traverse` API.
 *
 * @return TransformResult instance.
 *
 * Example:
 *
 *   transform(/[a-z]/i, {
 *     onChar(path) {
 *       const {node} = path;
 *
 *       if (...) {
 *         path.remove();
 *       }
 *     }
 *   });
 */
export declare function transform(regexp: any, handlers: any): TransformResult;
