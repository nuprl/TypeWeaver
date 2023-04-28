declare function parseCJS(source: string, name: string, string: any): {
    exports: any[];
    reexports: any[];
};
export declare const init: () => Promise<void>;
export declare const parse: typeof parseCJS;
export {};
