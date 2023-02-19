/// <reference types="node" />
declare class Test {
    constructor(num?: number);
    get number(): any;
}
declare const _default: {
    regexp: RegExp;
    array: (string | number | Date)[];
    map: Map<{
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
    set: Set<number[] | {
        foo: number;
        bar?: undefined;
    } | {
        bar: number;
        foo?: undefined;
    }>;
    custom: Test;
    int8arr: Int8Array;
    dataview: DataView;
    buffer: Buffer;
};
export default _default;
