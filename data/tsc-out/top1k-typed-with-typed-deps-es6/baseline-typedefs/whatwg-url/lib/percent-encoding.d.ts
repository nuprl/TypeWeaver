declare namespace _default {
    export { isC0ControlPercentEncode };
    export { isFragmentPercentEncode };
    export { isQueryPercentEncode };
    export { isSpecialQueryPercentEncode };
    export { isPathPercentEncode };
    export { isUserinfoPercentEncode };
    export { isURLEncodedPercentEncode };
    export { percentDecodeString };
    export { percentDecodeBytes };
    export { utf8PercentEncodeString };
    export { utf8PercentEncodeCodePoint };
}
export default _default;
declare function isC0ControlPercentEncode(c: any): boolean;
declare function isFragmentPercentEncode(c: any): boolean;
declare function isQueryPercentEncode(c: any): boolean;
declare function isSpecialQueryPercentEncode(c: any): boolean;
declare function isPathPercentEncode(c: any): boolean;
declare function isUserinfoPercentEncode(c: any): boolean;
declare function isURLEncodedPercentEncode(c: any): boolean;
declare function percentDecodeString(input: any): Uint8Array;
declare function percentDecodeBytes(input: any): Uint8Array;
declare function utf8PercentEncodeString(input: any, percentEncodePredicate: any, spaceAsPlus?: boolean): string;
declare function utf8PercentEncodeCodePoint(codePoint: any, percentEncodePredicate: any): string;
