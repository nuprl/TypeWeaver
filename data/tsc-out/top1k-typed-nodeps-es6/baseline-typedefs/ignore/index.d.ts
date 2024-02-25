export default factory;
declare function factory(options: any): Ignore;
declare namespace factory {
    export { isPathValid };
    export { factory as default };
}
declare class Ignore {
    constructor({ ignorecase, ignoreCase, allowRelativePaths }?: {
        ignorecase?: boolean;
        ignoreCase?: any;
        allowRelativePaths?: boolean;
    });
    _rules: any[];
    _ignoreCase: any;
    _allowRelativePaths: boolean;
    _initCache(): void;
    _ignoreCache: any;
    _testCache: any;
    _addPattern(pattern: any): void;
    _added: boolean;
    add(pattern: any): Ignore;
    addPattern(pattern: any): Ignore;
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
declare function isPathValid(path: any): any;
