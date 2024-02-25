export default Long;
declare function Long(low: number, high: number, unsigned?: boolean | undefined): void;
declare class Long {
    constructor(low: number, high: number, unsigned?: boolean | undefined);
    low: number;
    high: number;
    unsigned: boolean;
    private readonly __isLong__;
}
declare namespace Long {
    export { isLong };
    export { fromInt };
    export { fromNumber };
    export { fromBits };
    export { fromString };
    export { fromValue };
    export { ZERO };
    export { UZERO };
    export { ONE };
    export { UONE };
    export { NEG_ONE };
    export { MAX_VALUE };
    export { MAX_UNSIGNED_VALUE };
    export { MIN_VALUE };
    export function fromBytes(bytes: number[], unsigned?: boolean, le?: boolean): Long;
    export function fromBytesLE(bytes: number[], unsigned?: boolean): Long;
    export function fromBytesBE(bytes: number[], unsigned?: boolean): Long;
}
declare function isLong(obj: any): boolean;
declare function fromInt(value: number, unsigned?: boolean | undefined): Long;
declare function fromNumber(value: number, unsigned?: boolean | undefined): Long;
declare function fromBits(lowBits: number, highBits: number, unsigned?: boolean | undefined): Long;
declare function fromString(str: string, unsigned?: (boolean | number) | undefined, radix?: number | undefined): Long;
declare function fromValue(val: Long | number | string | {
    low: number;
    high: number;
    unsigned: boolean;
}, unsigned?: boolean | undefined): Long;
declare var ZERO: Long;
declare var UZERO: Long;
declare var ONE: Long;
declare var UONE: Long;
declare var NEG_ONE: Long;
declare var MAX_VALUE: Long;
declare var MAX_UNSIGNED_VALUE: Long;
declare var MIN_VALUE: Long;
