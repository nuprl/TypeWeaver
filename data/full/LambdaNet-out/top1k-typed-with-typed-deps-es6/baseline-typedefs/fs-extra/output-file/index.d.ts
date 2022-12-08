declare function outputFileSync(file: string, ...args: any[]): number;
declare const _default: {
    outputFile: (...args: any[]) => void | Promise<any>;
    outputFileSync: typeof outputFileSync;
};
export default _default;
