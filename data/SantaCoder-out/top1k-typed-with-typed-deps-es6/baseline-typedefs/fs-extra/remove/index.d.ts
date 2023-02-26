declare function removeSync(path: string): void;
declare const _default: {
    remove: (...args: any[]) => void | Promise<any>;
    removeSync: typeof removeSync;
};
export default _default;
