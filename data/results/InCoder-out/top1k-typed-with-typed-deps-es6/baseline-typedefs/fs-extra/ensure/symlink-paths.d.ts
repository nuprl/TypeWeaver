/// <reference types="node" />
declare function symlinkPaths(srcpath: string, dstpath: string, callback: Function): any;
declare function symlinkPathsSync(srcpath: string | Buffer, dstpath: string | Buffer): {
    toCwd: string | Buffer;
    toDst: string | Buffer;
};
declare const _default: {
    symlinkPaths: typeof symlinkPaths;
    symlinkPathsSync: typeof symlinkPathsSync;
};
export default _default;
