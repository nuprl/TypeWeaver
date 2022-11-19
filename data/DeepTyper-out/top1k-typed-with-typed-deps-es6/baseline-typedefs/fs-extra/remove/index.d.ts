declare function removeSync(path: string): any;
declare const _default: {
    remove: (...args: any[]) => void | Promise<any>;
    removeSync: typeof removeSync;
};
export default _default;
