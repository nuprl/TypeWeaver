export default isTypedArray;
declare function isTypedArray(arr: unknown): any;
declare namespace isTypedArray {
    var strict: typeof isStrictTypedArray;
    var loose: typeof isLooseTypedArray;
}
declare function isStrictTypedArray(arr: unknown): boolean;
declare function isLooseTypedArray(arr: unknown): any;
