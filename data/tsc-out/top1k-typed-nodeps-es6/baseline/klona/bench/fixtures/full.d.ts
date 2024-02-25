export default item;
declare const item: {
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
    int8arr: Int8Array;
    buffer: Buffer;
    symbol1: symbol;
    symbol2: symbol;
    [symbol1]: string;
    [symbol2]: number[];
};
declare const symbol1: unique symbol;
declare const symbol2: unique symbol;
