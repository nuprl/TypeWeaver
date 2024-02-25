export default punycode;
declare namespace punycode {
    export const version: string;
    export const ucs2: any;
    export { decode };
    export { encode };
    export { toASCII };
    export { toUnicode };
}
declare function decode(input: string): string;
declare function encode(input: string): string;
declare function toASCII(input: string): string;
declare function toUnicode(input: string): string;
