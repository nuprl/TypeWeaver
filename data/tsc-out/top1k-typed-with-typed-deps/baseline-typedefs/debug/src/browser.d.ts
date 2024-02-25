export const storage: LocalStorage;
export function destroy(): void;
export const colors: string[];
export const log: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
};
declare const _exports: {
    (namespace: string): Function;
    debug: any;
    default: any;
    coerce: (val: Mixed) => Mixed;
    disable: () => string;
    enable: (namespaces: string) => void;
    enabled: (name: string) => boolean;
    humanize: typeof import("ms");
    destroy: (() => void) | (() => void);
    names: any[];
    skips: any[];
    formatters: {};
    selectColor: (namespace: string) => string | number;
    formatArgs: typeof formatArgs;
    save: typeof save;
    load: typeof load;
    useColors: typeof useColors;
    storage: LocalStorage;
    colors: string[];
    log: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
};
export = _exports;
export function formatArgs(args: any): void;
export function save(namespaces: string): void;
export function load(): string;
export function useColors(): any;
