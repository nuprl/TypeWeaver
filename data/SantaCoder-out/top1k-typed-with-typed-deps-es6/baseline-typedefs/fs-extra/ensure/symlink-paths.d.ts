declare function symlinkPaths(srcpath: string, dstpath: string, callback: any): any;
declare function symlinkPathsSync(srcpath: string, dstpath: string): {
    toCwd: string;
    toDst: string;
};
declare const _default: {
    symlinkPaths: typeof symlinkPaths;
    symlinkPathsSync: typeof symlinkPathsSync;
};
export default _default;
