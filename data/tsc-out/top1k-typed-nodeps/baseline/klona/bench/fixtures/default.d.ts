declare class Test {
    constructor(num?: number);
    value: number;
    items: number[];
    get number(): number;
}
export const regexp: RegExp;
export const array: (string | number | Date)[];
export const map: Map<{
    foo: number;
    bar?: undefined;
} | {
    bar: number;
    foo?: undefined;
}, {
    a: number;
    b?: undefined;
} | {
    b: number;
    a?: undefined;
}>;
export const set: Set<number[] | {
    foo: number;
    bar?: undefined;
} | {
    bar: number;
    foo?: undefined;
}>;
export const custom: Test;
export const int8arr: Int8Array;
export const dataview: DataView;
export const buffer: Buffer;
export {};
