declare function symlinkPaths(srcpath: string, dstpath: string, callback: any): string;
declare function symlinkPathsSync(srcpath: string, dstpath: string): any;
declare const _default: {
    symlinkPaths: typeof symlinkPaths;
    symlinkPathsSync: typeof symlinkPathsSync;
};
export default _default;
