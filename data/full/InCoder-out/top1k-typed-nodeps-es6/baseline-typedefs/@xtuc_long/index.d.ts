/// <reference types="node" />
declare function Long(low: number, high: number, unsigned: boolean): void;
declare namespace Long {
    var isLong: (obj: Long) => boolean;
    var fromInt: (value: number, unsigned: boolean) => any;
    var fromNumber: (value: number, unsigned: boolean) => any;
    var fromBits: (lowBits: number, highBits: number, unsigned: boolean) => any;
    var fromString: (str: string | number, unsigned: boolean, radix: number) => any;
    var fromValue: (val: number, unsigned: boolean) => any;
    var ZERO: any;
    var UZERO: any;
    var ONE: any;
    var UONE: any;
    var NEG_ONE: any;
    var MAX_VALUE: any;
    var MAX_UNSIGNED_VALUE: any;
    var MIN_VALUE: any;
    var fromBytes: (bytes: ByteArray, unsigned: boolean, le: number) => any;
    var fromBytesLE: (bytes: Buffer, unsigned: boolean) => any;
    var fromBytesBE: (bytes: Bytes, unsigned: Boolean) => any;
}
export default Long;
