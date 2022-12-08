/// <reference types="node" />
declare const path: any;
declare const fs: any;
declare const pathExists: any;
declare function symlinkPaths(srcpath: string, dstpath: string, callback: Function): any;
declare function symlinkPathsSync(srcpath: string | Buffer, dstpath: string | Buffer): {
    toCwd: any;
    toDst: string | Buffer;
} | {
    toCwd: string | Buffer;
    toDst: any;
};
