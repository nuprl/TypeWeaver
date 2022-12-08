export default isTypedArray;
declare function isTypedArray(arr: any): boolean;
declare namespace isTypedArray {
    var strict: typeof isStrictTypedArray;
    var loose: typeof isLooseTypedArray;
}
declare function isStrictTypedArray(arr: any): boolean;
declare function isLooseTypedArray(arr: any): any;
