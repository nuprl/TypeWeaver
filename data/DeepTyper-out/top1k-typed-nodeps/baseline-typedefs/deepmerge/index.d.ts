declare var defaultIsMergeableObject: any;
declare function emptyTarget(val: any): any;
declare function cloneUnlessOtherwiseSpecified(value: any, options: any): boolean;
declare function defaultArrayMerge(target: any, source: any, options: any): any;
declare function getMergeFunction(key: any, options: any): any;
declare function getEnumerableOwnPropertySymbols(target: any): boolean;
declare function getKeys(target: Object): string[];
declare function propertyIsOnObject(object: any, property: string): boolean;
declare function propertyIsUnsafe(target: Object, key: string): boolean;
declare function mergeObject(target: any, source: any, options: any): any;
declare function deepmerge(target: any, source: any, options: any): any;
declare namespace deepmerge {
    var all: (array: any, options: any) => any;
}
