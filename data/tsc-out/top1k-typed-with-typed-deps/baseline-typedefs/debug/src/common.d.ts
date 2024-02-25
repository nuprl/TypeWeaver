export = setup;
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
    names: any[];
    skips: any[];
    formatters: {};
    selectColor: (namespace: string) => number | string;
};
