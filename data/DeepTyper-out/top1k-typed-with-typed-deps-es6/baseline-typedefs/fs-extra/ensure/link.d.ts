declare function createLinkSync(srcpath: string, dstpath: string): void;
declare const _default: {
    createLink: (...args: any[]) => void | Promise<any>;
    createLinkSync: typeof createLinkSync;
};
export default _default;
