declare const maxInt = 2147483647;
declare const base = 36;
declare const tMin = 1;
declare const tMax = 26;
declare const skew = 38;
declare const damp = 700;
declare const initialBias = 72;
declare const initialN = 128;
declare const delimiter = "-";
declare const regexPunycode: RegExp;
declare const regexNonASCII: RegExp;
declare const regexSeparators: RegExp;
declare const errors: {
    overflow: string;
    'not-basic': string;
    'invalid-input': string;
};
declare const baseMinusTMin: number;
declare const floor: (x: number) => number;
declare const stringFromCharCode: (...codes: number[]) => string;
declare function error(type: string): void;
declare function map(array: any[], fn: Function): any[];
declare function mapDomain(string: string, fn: any): string;
declare function ucs2decode(string: string): any[];
declare const ucs2encode: (array: any) => string;
declare const basicToDigit: (codePoint: number) => number;
declare const digitToBasic: (digit: number, flag: number) => number;
declare const adapt: (delta: number, numPoints: number, firstTime: boolean) => number;
declare const decode: (input: string) => string;
declare const encode: (input: number) => string;
declare const toUnicode: (input: string) => string;
declare const toASCII: (input: string) => string;
declare const punycode: {
    version: string;
    ucs2: {
        decode: typeof ucs2decode;
        encode: (array: any) => string;
    };
    decode: (input: string) => string;
    encode: (input: number) => string;
    toASCII: (input: string) => string;
    toUnicode: (input: string) => string;
};
