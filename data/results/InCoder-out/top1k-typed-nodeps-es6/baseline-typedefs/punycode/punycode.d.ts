declare function ucs2decode(string: Uint8Array): any[];
declare const punycode: {
    version: string;
    ucs2: {
        decode: typeof ucs2decode;
        encode: (array: any) => string;
    };
    decode: (input: Uint8Array) => string;
    encode: (input: number[]) => string;
    toASCII: (input: any) => string;
    toUnicode: (input: any) => string;
};
export default punycode;
