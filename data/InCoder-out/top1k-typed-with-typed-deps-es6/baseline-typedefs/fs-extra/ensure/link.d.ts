declare function createLinkSync(srcpath: String, dstpath: String): void;
declare const _default: {
    createLink: (...args: any[]) => void | Promise<any>;
    createLinkSync: typeof createLinkSync;
};
export default _default;
