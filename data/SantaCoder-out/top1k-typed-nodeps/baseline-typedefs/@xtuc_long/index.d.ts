declare function Long(low: number, high: number, unsigned: boolean): void;
declare namespace Long {
    var isLong: (obj: any) => boolean;
    var fromInt: (value: number, unsigned: boolean) => any;
    var fromNumber: (value: number, unsigned: boolean) => any;
    var fromBits: (lowBits: number, highBits: number, unsigned: boolean) => any;
    var fromString: (str: string, unsigned: boolean, radix: number) => any;
    var fromValue: (val: string, unsigned: boolean) => any;
    var ZERO: any;
    var UZERO: any;
    var ONE: any;
    var UONE: any;
    var NEG_ONE: any;
    var MAX_VALUE: any;
    var MAX_UNSIGNED_VALUE: any;
    var MIN_VALUE: any;
    var fromBytes: (bytes: Uint8Array, unsigned: boolean, le: boolean) => any;
    var fromBytesLE: (bytes: Uint8Array, unsigned: boolean) => any;
    var fromBytesBE: (bytes: Uint8Array, unsigned: boolean) => any;
}
export default Long;
