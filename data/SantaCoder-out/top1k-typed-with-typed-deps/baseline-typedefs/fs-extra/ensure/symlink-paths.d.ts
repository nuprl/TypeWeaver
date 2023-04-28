declare const path: any;
declare const fs: any;
declare const pathExists: any;
declare function symlinkPaths(srcpath: string, dstpath: string, callback: Function): any;
declare function symlinkPathsSync(srcpath: string, dstpath: string): {
    toCwd: any;
    toDst: string;
} | {
    toCwd: string;
    toDst: any;
};
