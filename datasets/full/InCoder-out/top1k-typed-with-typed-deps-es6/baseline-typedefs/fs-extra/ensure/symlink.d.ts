/// <reference types="node" />
declare function createSymlinkSync(srcpath: string | Buffer, dstpath: string | Buffer, type: string): any;
declare const _default: {
    createSymlink: (...args: any[]) => void | Promise<any>;
    createSymlinkSync: typeof createSymlinkSync;
};
export default _default;
