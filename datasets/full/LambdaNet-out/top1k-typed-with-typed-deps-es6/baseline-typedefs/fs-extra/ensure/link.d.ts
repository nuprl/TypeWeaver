declare function createLinkSync(srcpath: string, dstpath: string): boolean;
declare const _default: {
    createLink: (...args: any[]) => void | Promise<any>;
    createLinkSync: typeof createLinkSync;
};
export default _default;
