declare namespace _default {
    export { isArray };
    export { isArrayBuffer };
    export { isBuffer };
    export { isFormData };
    export { isArrayBufferView };
    export { isString };
    export { isNumber };
    export { isBoolean };
    export { isObject };
    export { isPlainObject };
    export { isUndefined };
    export { isDate };
    export { isFile };
    export { isBlob };
    export { isRegExp };
    export { isFunction };
    export { isStream };
    export { isURLSearchParams };
    export { isTypedArray };
    export { isFileList };
    export { forEach };
    export { merge };
    export { extend };
    export { trim };
    export { stripBOM };
    export { inherits };
    export { toFlatObject };
    export { kindOf };
    export { kindOfTest };
    export { endsWith };
    export { toArray };
    export { forEachEntry };
    export { matchAll };
    export { isHTMLForm };
    export { hasOwnProperty };
    export { hasOwnProperty as hasOwnProp };
    export { reduceDescriptors };
    export { freezeMethods };
    export { toObjectSet };
    export { toCamelCase };
    export { noop };
    export { toFiniteNumber };
}
export default _default;
declare const isArray: (arg: any) => arg is any[];
declare function isArrayBuffer(thing: any): boolean;
/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
declare function isBuffer(val: any): boolean;
/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
declare function isFormData(thing: any): boolean;
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
declare function isArrayBufferView(val: any): boolean;
declare function isString(thing: any): boolean;
declare function isNumber(thing: any): boolean;
/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
declare function isBoolean(thing: any): boolean;
/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
declare function isObject(thing: any): boolean;
/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
declare function isPlainObject(val: any): boolean;
declare function isUndefined(thing: any): boolean;
declare function isDate(thing: any): boolean;
declare function isFile(thing: any): boolean;
declare function isBlob(thing: any): boolean;
declare function isRegExp(thing: any): boolean;
declare function isFunction(thing: any): boolean;
/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
declare function isStream(val: any): boolean;
declare function isURLSearchParams(thing: any): boolean;
declare function isTypedArray(thing: any): boolean;
declare function isFileList(thing: any): boolean;
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {void}
 */
declare function forEach(obj: any | any[], fn: Function, { allOwnKeys }?: boolean): void;
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
declare function merge(...args: any[]): any;
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
declare function extend(a: any, b: any, thisArg: any, { allOwnKeys }?: boolean): any;
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
declare function trim(str: string): string;
/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
declare function stripBOM(content: string): string;
/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
declare function inherits(constructor: Function, superConstructor: Function, props?: object, descriptors?: object): void;
/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
declare function toFlatObject(sourceObj: any, destObj?: any, filter?: Function | boolean, propFilter?: Function): any;
declare function kindOf(thing: any): any;
declare function kindOfTest(type: any): (thing: any) => boolean;
/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
declare function endsWith(str: string, searchString: string, position?: number): boolean;
/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
declare function toArray(thing?: any): any[] | null;
/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
declare function forEachEntry(obj: any, fn: Function): void;
/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
declare function matchAll(regExp: string, str: string): Array<boolean>;
declare function isHTMLForm(thing: any): boolean;
declare function hasOwnProperty(obj: any, prop: any): any;
declare function reduceDescriptors(obj: any, reducer: any): void;
/**
 * Makes all methods read-only
 * @param {Object} obj
 */
declare function freezeMethods(obj: any): void;
declare function toObjectSet(arrayOrString: any, delimiter: any): {};
declare function toCamelCase(str: any): any;
declare function noop(): void;
declare function toFiniteNumber(value: any, defaultValue: any): any;
