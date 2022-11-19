declare function createFileSync(file: File): void;
declare const _default: {
    createFile: (...args: any[]) => void | Promise<any>;
    createFileSync: typeof createFileSync;
};
export default _default;
