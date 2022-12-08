declare function checkPaths(src: string, dest: string, funcName: string, opts: Function, cb: Function): void;
declare function checkPathsSync(src: string, dest: string, funcName: string, opts: string): object;
declare function checkParentPaths(src: string, srcStat: string, dest: string, funcName: string, cb: Function): void;
declare function checkParentPathsSync(src: string, srcStat: string, dest: string, funcName: string): boolean;
declare function areIdentical(srcStat: any[], destStat: any[]): boolean;
declare function isSrcSubdir(src: string, dest: string): any[];
declare const _default: {
    checkPaths: typeof checkPaths;
    checkPathsSync: typeof checkPathsSync;
    checkParentPaths: typeof checkParentPaths;
    checkParentPathsSync: typeof checkParentPathsSync;
    isSrcSubdir: typeof isSrcSubdir;
    areIdentical: typeof areIdentical;
};
export default _default;
