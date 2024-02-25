/**
 * Optimizer transforms a regular expression into an optimized version,
 * replacing some sub-expressions with their idiomatic patterns.
 *
 * @param string | RegExp | AST - a regexp to optimize.
 *
 * @return TransformResult - an optimized regexp.
 *
 * Example:
 *
 *   /[a-zA-Z_0-9][a-zA-Z_0-9]*\e{1,}/
 *
 * Optimized to:
 *
 *   /\w+e+/
 */
export function optimize(regexp: any, { whitelist, blacklist }?: {
    whitelist?: any[];
    blacklist?: any[];
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
