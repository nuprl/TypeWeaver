export default isTypedArray;
declare function isTypedArray(arr: any): any;
declare namespace isTypedArray {
    export { isStrictTypedArray as strict };
    export { isLooseTypedArray as loose };
}
declare function isStrictTypedArray(arr: any): boolean;
declare function isLooseTypedArray(arr: any): any;
