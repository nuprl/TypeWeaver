declare function symlinkPaths(srcpath: any[], dstpath: string, callback: Function): number;
declare function symlinkPathsSync(srcpath: string, dstpath: string): object;
declare const _default: {
    symlinkPaths: typeof symlinkPaths;
    symlinkPathsSync: typeof symlinkPathsSync;
};
export default _default;
