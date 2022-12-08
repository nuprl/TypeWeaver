declare function checkPaths(src: string, dest: string, funcName: string, opts: any, cb: any): any;
declare function checkPathsSync(src: string, dest: string, funcName: string, opts: any): any;
declare function checkParentPaths(src: string, srcStat: string, dest: string, funcName: string, cb: any): any;
declare function checkParentPathsSync(src: string, srcStat: string, dest: string, funcName: string): any;
declare function areIdentical(srcStat: any, destStat: any): boolean;
declare function isSrcSubdir(src: string, dest: string): boolean;
declare const _default: {
    checkPaths: typeof checkPaths;
    checkPathsSync: typeof checkPathsSync;
    checkParentPaths: typeof checkParentPaths;
    checkParentPathsSync: typeof checkParentPathsSync;
    isSrcSubdir: typeof isSrcSubdir;
    areIdentical: typeof areIdentical;
};
export default _default;
