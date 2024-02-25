export function init(): Promise<void>;
export function parse(source: any, name?: string): {
    exports: any[];
    reexports: any[];
};
