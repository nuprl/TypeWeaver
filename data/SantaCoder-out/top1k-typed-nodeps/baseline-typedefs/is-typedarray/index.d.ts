declare var toString: () => string;
declare var names: {
    '[object Int8Array]': boolean;
    '[object Int16Array]': boolean;
    '[object Int32Array]': boolean;
    '[object Uint8Array]': boolean;
    '[object Uint8ClampedArray]': boolean;
    '[object Uint16Array]': boolean;
    '[object Uint32Array]': boolean;
    '[object Float32Array]': boolean;
    '[object Float64Array]': boolean;
};
declare function isTypedArray(arr: any): any;
declare namespace isTypedArray {
    var strict: typeof isStrictTypedArray;
    var loose: typeof isLooseTypedArray;
}
declare function isStrictTypedArray(arr: any): boolean;
declare function isLooseTypedArray(arr: any): any;
