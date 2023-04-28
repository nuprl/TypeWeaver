declare function isBuffer(val: any): any;
declare function isArrayBufferView(val: any): any;
declare function forEach(obj: any, fn: Function, { allOwnKeys }: {
    allOwnKeys?: boolean;
}, Object: any): void;
declare function merge(Object: any): {};
declare const _default: {
    isArray: (arg: any) => arg is any[];
    isArrayBuffer: (thing: any) => boolean;
    isBuffer: typeof isBuffer;
    isFormData: (thing: any) => boolean;
    isArrayBufferView: typeof isArrayBufferView;
    isString: (thing: any) => boolean;
    isNumber: (thing: any) => boolean;
    isBoolean: (thing: any) => boolean;
    isObject: (thing: any) => boolean;
    isPlainObject: (val: any) => boolean;
    isUndefined: (thing: any) => boolean;
    isDate: (thing: any) => boolean;
    isFile: (thing: any) => boolean;
    isBlob: (thing: any) => boolean;
    isRegExp: (thing: any) => boolean;
    isFunction: (thing: any) => boolean;
    isStream: (val: any) => boolean;
    isURLSearchParams: (thing: any) => boolean;
    isTypedArray: (thing: any) => boolean;
    isFileList: (thing: any) => boolean;
    forEach: typeof forEach;
    merge: typeof merge;
    extend: (a: any, b: any, thisArg: any, { allOwnKeys }?: {
        allOwnKeys: any;
    }) => any;
    trim: (str: any) => any;
    stripBOM: (content: any) => any;
    inherits: (constructor: any, superConstructor: any, props: any, descriptors: any) => void;
    toFlatObject: (sourceObj: any, destObj: any, filter: any, propFilter: any) => any;
    kindOf: (thing: any) => any;
    kindOfTest: (type: any) => (thing: any) => boolean;
    endsWith: (str: any, searchString: any, position: any) => boolean;
    toArray: (thing: any) => any[];
    forEachEntry: (obj: any, fn: any) => void;
    matchAll: (regExp: any, str: any) => any[];
    isHTMLForm: (thing: any) => boolean;
    hasOwnProperty: (obj: any, prop: any) => any;
    hasOwnProp: (obj: any, prop: any) => any;
    reduceDescriptors: (obj: any, reducer: any) => void;
    freezeMethods: (obj: any) => void;
    toObjectSet: (arrayOrString: any, delimiter: any) => {};
    toCamelCase: (str: any) => any;
    noop: () => void;
    toFiniteNumber: (value: any, defaultValue: any) => any;
};
export default _default;
