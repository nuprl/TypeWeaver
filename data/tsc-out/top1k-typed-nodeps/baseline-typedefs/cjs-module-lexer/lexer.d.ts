export function init(): Promise<void>;
export { parseCJS as parse };
declare function parseCJS(source: any, name?: string): {
    exports: any[];
    reexports: any[];
};
