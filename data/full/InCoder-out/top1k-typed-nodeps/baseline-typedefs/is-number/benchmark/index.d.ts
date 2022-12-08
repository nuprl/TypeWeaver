declare const Suite: any;
declare const cursor: any;
declare const fixtures: any;
declare const cycle: (e: any, nl: any) => void;
declare function bench(name: string): {
    run: any;
    add(key: any, fn: any): any;
};
declare function run(fn: Function, prop: string, boolean: any): void;
declare function isNumberParseFloat(n: number): boolean;
declare function isNumber60(val: number): boolean;
declare function isNumber61(val: number): boolean;
