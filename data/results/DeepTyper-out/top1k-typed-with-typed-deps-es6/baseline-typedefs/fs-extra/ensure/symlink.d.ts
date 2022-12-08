declare function createSymlinkSync(srcpath: any, dstpath: any, type: any): any;
declare const _default: {
    createSymlink: (...args: any[]) => void | Promise<any>;
    createSymlinkSync: typeof createSymlinkSync;
};
export default _default;
