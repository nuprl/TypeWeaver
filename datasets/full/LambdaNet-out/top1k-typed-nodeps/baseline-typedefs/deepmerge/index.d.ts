declare var defaultIsMergeableObject: number;
declare function emptyTarget(val: any[]): any[];
declare function cloneUnlessOtherwiseSpecified(value: string, options: Function): string;
declare function defaultArrayMerge(target: object, source: any[], options: object): any[];
declare function getMergeFunction(key: string, options: object): Function;
declare function getEnumerableOwnPropertySymbols(target: object): any[];
declare function getKeys(target: Function): any[];
declare function propertyIsOnObject(object: object, property: string): boolean;
declare function propertyIsUnsafe(target: any[], key: string): boolean;
declare function mergeObject(target: object, source: object, options: Function): object;
declare function deepmerge(target: any[], source: string, options: object): string;
declare namespace deepmerge {
    var all: (array: any[], options: object) => object;
}
