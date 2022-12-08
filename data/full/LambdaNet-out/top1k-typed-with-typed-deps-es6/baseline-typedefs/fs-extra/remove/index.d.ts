declare function removeSync(path: string): boolean;
declare const _default: {
    remove: (...args: any[]) => void | Promise<any>;
    removeSync: typeof removeSync;
};
export default _default;
