export const storage: LocalStorage;
export function destroy(): void;
export const colors: string[];
export const log: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
};
declare const _exports: {
    (namespace: string): Function;
    debug: {
        (namespace: string): Function;
        debug: any;
        default: any;
        coerce: (val: Mixed) => Mixed;
        disable: () => string;
        enable: (namespaces: string) => void;
        enabled: (name: string) => boolean;
        humanize: typeof import("ms");
        destroy: () => void;
        names: any[];
        skips: any[];
        formatters: {};
        selectColor: (namespace: string) => string | number;
    };
    default: {
        (namespace: string): Function;
        debug: any;
        default: any;
        coerce: (val: Mixed) => Mixed;
        disable: () => string;
        enable: (namespaces: string) => void;
        enabled: (name: string) => boolean;
        humanize: typeof import("ms");
        destroy: () => void;
        names: any[];
        skips: any[];
        formatters: {};
        selectColor: (namespace: string) => string | number;
    };
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
    /**
     * Colors.
     */
    colors: string[];
    /**
     * Invokes `console.debug()` when available.
     * No-op when `console.debug` is not a "function".
     * If `console.debug` is not available, falls back
     * to `console.log`.
     *
     * @api public
     */
    log: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
};
export = _exports;
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */
export function formatArgs(args: any): void;
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
export function save(namespaces: string): void;
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
export function load(): string;
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
export function useColors(): any;
