declare function setup(env: string): {
    (namespace: string): {
        (...args: any[]): void;
        namespace: string;
        useColors: any;
        color: any;
        extend: (namespace: string, delimiter: string) => any;
        destroy: () => void;
    };
    debug: any;
    default: any;
    coerce: (val: any) => any;
    disable: () => string;
    enable: (namespaces: string) => void;
    enabled: (name: string) => boolean;
    humanize: any;
    destroy: () => void;
    names: any[];
    skips: any[];
    formatters: {};
    selectColor: (namespace: string) => any;
};
