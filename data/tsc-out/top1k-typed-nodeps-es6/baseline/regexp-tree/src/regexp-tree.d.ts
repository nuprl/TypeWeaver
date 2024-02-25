export default regexpTree;
declare namespace regexpTree {
    export { parser };
    export { fa };
    export const TransformResult: {
        new (ast: any, extra?: any): {
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
        };
    };
    /**
     * Parses a regexp string, producing an AST.
     *
     * @param string regexp
     *
     *   a regular expression in different formats: string, AST, RegExp.
     *
     * @param Object options
     *
     *   parsing options for this parse call. Default are:
     *
     *     - captureLocations: boolean
     *     - any other custom options
     *
     * @return Object AST
     */
    export function parse(regexp: any, options: any): any;
    /**
     * Traverses a RegExp AST.
     *
     * @param Object ast
     * @param Object | Array<Object> handlers
     *
     * Each `handler` is an object containing handler function for needed
     * node types. Example:
     *
     *   regexpTree.traverse(ast, {
     *     onChar(node) {
     *       ...
     *     },
     *   });
     *
     * The value for a node type may also be an object with functions pre and post.
     * This enables more context-aware analyses, e.g. measuring star height.
     */
    export function traverse(ast: any, handlers: any, options: any): void;
    /**
     * Transforms a regular expression.
     *
     * A regexp can be passed in different formats (string, regexp or AST),
     * applying a set of transformations. It is a convenient wrapper
     * on top of "parse-traverse-generate" tool chain.
     *
     * @param string | AST | RegExp regexp - a regular expression;
     * @param Object | Array<Object> handlers - a list of handlers.
     *
     * @return TransformResult - a transformation result.
     */
    export function transform(regexp: any, handlers: any): {
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
    };
    /**
     * Generates a RegExp string from an AST.
     *
     * @param Object ast
     *
     * Invariant:
     *
     *   regexpTree.generate(regexpTree.parse('/[a-z]+/i')); // '/[a-z]+/i'
     */
    export function generate(ast: any): any;
    /**
     * Creates a RegExp object from a regexp string.
     *
     * @param string regexp
     */
    export function toRegExp(regexp: any): RegExp;
    /**
     * Optimizes a regular expression by replacing some
     * sub-expressions with their idiomatic patterns.
     *
     * @param string regexp
     *
     * @return TransformResult object
     */
    export function optimize(regexp: any, whitelist: any, { blacklist }?: {
        blacklist: any;
    }): {
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
    };
    /**
     * Translates a regular expression in new syntax or in new format
     * into equivalent expressions in old syntax.
     *
     * @param string regexp
     *
     * @return TransformResult object
     */
    export function compatTranspile(regexp: any, whitelist: any): undefined;
    /**
     * Executes a regular expression on a string.
     *
     * @param RegExp|string re - a regular expression.
     * @param string string - a testing string.
     */
    export function exec(re: any, string: any): any;
}
import parser from "./parser";
import fa from "./interpreter/finite-automaton";
