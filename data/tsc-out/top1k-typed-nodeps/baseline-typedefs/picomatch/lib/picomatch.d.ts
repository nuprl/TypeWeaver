export = picomatch;
declare function picomatch(glob: any, options?: any | undefined, returnState?: boolean): Function | undefined;
declare namespace picomatch {
    export function test(input: string, regex: RegExp, options: any, { glob, posix }?: {
        glob: any;
        posix: any;
    }): any;
    export function matchBase(input: string, glob: string | RegExp, options: any, posix?: any): boolean;
    export function isMatch(str: string | any[], patterns: string | any[], options?: any): boolean;
    export function parse(pattern: string, options: any): any;
    export function scan(input: string, options: any): any;
    export function compileRe(state: any, options: any, returnOutput?: boolean, returnState?: boolean): RegExp;
    export function makeRe(input: any, options?: any, returnOutput?: boolean, returnState?: boolean): RegExp;
    export function toRegex(source: string, options: any): RegExp;
    export { constants };
}
import constants = require("./constants");
