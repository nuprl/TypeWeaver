export default micromatch;
declare function micromatch(list: string | Array<string>, patterns: string | Array<string>, options: any): any[];
declare namespace micromatch {
    export { micromatch as match };
    export function matcher(pattern: string, options: any): Function;
    export function isMatch(str: string, patterns: string | any[], options: any): boolean;
    import any = isMatch;
    export { any };
    export function not(list: any[], patterns: string | any[], options?: any): any[];
    export function contains(str: string, pattern: any, options: any): boolean;
    export function matchKeys(obj: any, patterns: string | any[], options: any): any;
    export function some(list: string | any[], patterns: string | any[], options: any): boolean;
    export function every(list: string | any[], patterns: string | any[], options: any): boolean;
    export function all(str: string | any[], patterns: string | any[], options: any): boolean;
    export function capture(glob: string, input: string, options: any): any[];
    export function makeRe(...args: any[]): RegExp;
    export function scan(...args: any[]): any;
    export function parse(patterns: any, options: any): any;
    export function braces(pattern: string, options: any): any[];
    export function braceExpand(pattern: any, options: any): any[];
}
