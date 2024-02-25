export = setup;
/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */
declare function setup(env: any): {
    (namespace: string): Function;
    debug: any;
    default: any;
    coerce: (val: Mixed) => Mixed;
    disable: () => string;
    enable: (namespaces: string) => void;
    enabled: (name: string) => boolean;
    humanize: typeof import("ms");
    destroy: () => void;
    /**
    * The currently active debug mode names, and names to skip.
    */
    names: any[];
    skips: any[];
    /**
    * Map of special "%n" handling functions, for the debug "format" argument.
    *
    * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
    */
    formatters: {};
    selectColor: (namespace: string) => number | string;
};
