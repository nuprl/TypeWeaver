declare const _exports: {
    (): () => void;
    unload: () => void;
    signals: () => typeof signals;
    load: () => void;
} | {
    (cb: any, opts: any): () => void;
    unload: () => void;
    signals: () => typeof signals;
    load: () => void;
};
export = _exports;
export function signals(): typeof signals;
import signals = require("./signals.js");
export function unload(): void;
export function load(): void;
