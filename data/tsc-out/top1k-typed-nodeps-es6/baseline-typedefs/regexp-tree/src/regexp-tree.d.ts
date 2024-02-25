export default regexpTree;
declare namespace regexpTree {
    export { parser };
    export { fa };
    export const TransformResult: {
        new (ast: any, extra?: any): transform.TransformResult;
    };
    export function parse(regexp: any, options: any): any;
    export function traverse(ast: any, handlers: any, options: any): void;
    export function transform(regexp: any, handlers: any): transform.TransformResult;
    export function generate(ast: any): any;
    export function toRegExp(regexp: any): RegExp;
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
    export function compatTranspile(regexp: any, whitelist: any): undefined;
    export function exec(re: any, string: any): any;
}
import parser from "./parser";
import fa from "./interpreter/finite-automaton";
import transform from "./transform";
