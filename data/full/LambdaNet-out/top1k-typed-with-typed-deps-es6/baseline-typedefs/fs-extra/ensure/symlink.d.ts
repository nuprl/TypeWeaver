declare function createSymlinkSync(srcpath: any[], dstpath: string, type: string): boolean;
declare const _default: {
    createSymlink: (...args: any[]) => void | Promise<any>;
    createSymlinkSync: typeof createSymlinkSync;
};
export default _default;
