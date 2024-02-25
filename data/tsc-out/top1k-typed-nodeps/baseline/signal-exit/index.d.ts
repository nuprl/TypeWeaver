declare const _exports: {
    (): () => void;
    unload: () => void;
    signals: () => string[];
    load: () => void;
} | {
    (cb: any, opts: any): () => void;
    unload: () => void;
    signals: () => string[];
    load: () => void;
};
export = _exports;
export function signals(): string[];
export function unload(): void;
export function load(): void;
