declare function makeException(ErrorType: object, message: string, options: object): string;
declare function toNumber(value: number, options: object): number;
declare function evenRound(x: number): string;
declare function integerPart(n: number): boolean;
declare function sign(x: string): number;
declare function modulo(x: string, y: string): number;
declare function censorNegativeZero(x: number): number;
declare function createIntegerConversion(bitLength: number, { unsigned }: {
    unsigned: any;
}): void;
declare function createLongLongConversion(bitLength: number, { unsigned }: {
    unsigned: any;
}): Promise;
declare const abByteLengthGetter: Function;
declare const sabByteLengthGetter: Function;
declare function isNonSharedArrayBuffer(value: string): boolean;
declare function isSharedArrayBuffer(value: string): boolean;
declare function isArrayBufferDetached(value: string): boolean;
declare const dvByteLengthGetter: Function;
declare const typedArrayNameGetter: Function;
