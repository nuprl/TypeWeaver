export function checkPaths(src: any, dest: any, funcName: any, opts: any, cb: any): void;
export function checkPathsSync(src: any, dest: any, funcName: any, opts: any): {
    srcStat: any;
    destStat: any;
    isChangingCase: boolean;
} | {
    srcStat: any;
    destStat: any;
    isChangingCase?: undefined;
};
export function checkParentPaths(src: any, srcStat: any, dest: any, funcName: any, cb: any): any;
export function checkParentPathsSync(src: any, srcStat: any, dest: any, funcName: any): any;
export function isSrcSubdir(src: any, dest: any): boolean;
export function areIdentical(srcStat: any, destStat: any): boolean;
