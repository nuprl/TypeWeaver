declare class Ignore {
    constructor({ ignorecase, ignoreCase, allowRelativePaths }?: {
        ignorecase?: boolean;
        ignoreCase?: any;
        allowRelativePaths?: boolean;
    });
    _initCache(): void;
    _addPattern(pattern: any): void;
    add(pattern: any): this;
    addPattern(pattern: any): this;
    _testOne(path: any, checkUnignored: any): {
        ignored: boolean;
        unignored: boolean;
    };
    _test(originalPath: any, cache: any, checkUnignored: any, slices: any): any;
    _t(path: any, cache: any, checkUnignored: any, slices: any): any;
    ignores(path: any): any;
    createFilter(): (path: any) => boolean;
    filter(paths: any): any[];
    test(path: any): any;
}
declare const factory: {
    (options: any): Ignore;
    isPathValid: (path: any) => any;
    default: any;
};
export default factory;
