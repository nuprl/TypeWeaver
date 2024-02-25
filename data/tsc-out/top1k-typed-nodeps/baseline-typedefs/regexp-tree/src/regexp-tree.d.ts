import parser = require("./parser/generated/regexp-tree");
import fa = require("./interpreter/finite-automaton");
import transform = require("./transform");
export declare const TransformResult: typeof import("./transform").TransformResult;
export declare function parse(regexp: any, options: any): any;
export declare function traverse(ast: any, handlers: any, options: any): void;
export declare function transform(regexp: any, handlers: any): transform.TransformResult;
export declare function generate(ast: any): any;
export declare function toRegExp(regexp: any): RegExp;
export declare function optimize(regexp: any, whitelist: any, { blacklist }?: {
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
export declare function compatTranspile(regexp: any, whitelist: any): undefined;
export declare function exec(re: any, string: any): any;
export { parser, fa };
