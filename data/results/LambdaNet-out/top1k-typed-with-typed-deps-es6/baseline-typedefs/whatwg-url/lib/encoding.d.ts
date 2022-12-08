declare function utf8Encode(string: string): any[];
declare function utf8DecodeWithoutBOM(bytes: string): Promise;
declare const _default: {
    utf8Encode: typeof utf8Encode;
    utf8DecodeWithoutBOM: typeof utf8DecodeWithoutBOM;
};
export default _default;
