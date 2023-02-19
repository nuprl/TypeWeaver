declare function Long(low: number, high: number, unsigned: boolean): void;
declare namespace Long {
    var isLong: (obj: object) => boolean;
    var fromInt: (value: number, unsigned: boolean) => object;
    var fromNumber: (value: number, unsigned: number) => string;
    var fromBits: (lowBits: number, highBits: number, unsigned: number) => string;
    var fromString: (str: string, unsigned: boolean, radix: number) => any[];
    var fromValue: (val: object, unsigned: string) => boolean;
    var ZERO: Function;
    var UZERO: object;
    var ONE: string;
    var UONE: string;
    var NEG_ONE: string;
    var MAX_VALUE: string;
    var MAX_UNSIGNED_VALUE: string;
    var MIN_VALUE: string;
    var fromBytes: (bytes: string, unsigned: string, le: boolean) => string;
    var fromBytesLE: (bytes: object, unsigned: string) => object;
    var fromBytesBE: (bytes: object, unsigned: string) => object;
}
export default Long;
