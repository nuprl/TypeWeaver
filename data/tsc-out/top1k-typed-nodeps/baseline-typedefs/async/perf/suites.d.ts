declare const _exports: ({
    name: string;
    args: number[][];
    setup(num: any): void;
    fn(async: any, done: any): void;
} | {
    name: string;
    fn(async: any, done: any): void;
})[];
export = _exports;
