declare function utf8Encode(string: string): Uint8Array;
declare function utf8DecodeWithoutBOM(bytes: Uint8Array): string;
declare const _default: {
    utf8Encode: typeof utf8Encode;
    utf8DecodeWithoutBOM: typeof utf8DecodeWithoutBOM;
};
export default _default;
