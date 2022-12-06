export default isTypedArray;
declare function isTypedArray(arr: string): boolean;
declare namespace isTypedArray {
    var strict: typeof isStrictTypedArray;
    var loose: typeof isLooseTypedArray;
}
declare function isStrictTypedArray(arr: string): boolean;
declare function isLooseTypedArray(arr: string): string;
