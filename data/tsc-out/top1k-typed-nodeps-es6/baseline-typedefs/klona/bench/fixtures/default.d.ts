declare namespace _default {
    const regexp: RegExp;
    const array: (string | number | Date)[];
    const map: Map<{
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
    const set: Set<number[] | {
        foo: number;
        bar?: undefined;
    } | {
        bar: number;
        foo?: undefined;
    }>;
    const custom: Test;
    const int8arr: Int8Array;
    const dataview: DataView;
    const buffer: Buffer;
}
export default _default;
declare class Test {
    constructor(num?: number);
    value: number;
    items: number[];
    get number(): number;
}
