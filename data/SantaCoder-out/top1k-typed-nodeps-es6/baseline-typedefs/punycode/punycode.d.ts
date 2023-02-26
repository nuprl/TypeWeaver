declare function ucs2decode(string: string): any[];
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
export default punycode;
