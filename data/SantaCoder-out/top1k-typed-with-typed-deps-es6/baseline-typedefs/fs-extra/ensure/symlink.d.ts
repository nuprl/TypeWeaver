declare function createSymlinkSync(srcpath: string, dstpath: string, type: 'junction'): any;
declare const _default: {
    createSymlink: (...args: any[]) => void | Promise<any>;
    createSymlinkSync: typeof createSymlinkSync;
};
export default _default;
