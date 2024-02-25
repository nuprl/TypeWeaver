export = clone;
declare function clone(parent: any, circular: any, depth: any, prototype: any, includeNonEnumerable: any): any;
declare namespace clone {
    export function clonePrototype(parent: any): any;
    export { __objToStr };
    export { __isDate };
    export { __isArray };
    export { __isRegExp };
    export { __getRegExpFlags };
}
declare function __objToStr(o: any): any;
declare function __isDate(o: any): boolean;
declare function __isArray(o: any): boolean;
declare function __isRegExp(o: any): boolean;
declare function __getRegExpFlags(re: any): string;
