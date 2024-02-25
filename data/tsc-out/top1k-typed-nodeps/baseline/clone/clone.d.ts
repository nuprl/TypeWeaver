export = clone;
/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
 * @param `includeNonEnumerable` - set to true if the non-enumerable properties
 *    should be cloned as well. Non-enumerable properties on the prototype
 *    chain will be ignored. (optional - false by default)
*/
declare function clone(parent: any, circular: any, depth: any, prototype: any, includeNonEnumerable: any): any;
declare namespace clone {
    /**
     * Simple flat clone using prototype, accepts only objects, usefull for property
     * override on FLAT configuration object (no nested props).
     *
     * USE WITH CAUTION! This may not behave as you wish if you do not know how this
     * works.
     */
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
