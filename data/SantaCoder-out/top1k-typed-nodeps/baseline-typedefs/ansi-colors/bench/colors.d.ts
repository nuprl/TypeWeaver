declare const Suite: any;
declare const chalk: any;
declare const colors: any;
declare const names: string[];
declare const cycle: (e: any, newline: any) => void;
declare function bench(name: string): {
    run: any;
    add: (key: any, fn: any) => any;
};
declare function fixture(lib: any): any;
