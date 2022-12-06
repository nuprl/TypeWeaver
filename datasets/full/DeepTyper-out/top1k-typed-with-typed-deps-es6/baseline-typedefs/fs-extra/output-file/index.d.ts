declare function outputFileSync(file: any, ...args: any[]): void;
declare const _default: {
    outputFile: (...args: any[]) => void | Promise<any>;
    outputFileSync: typeof outputFileSync;
};
export default _default;
