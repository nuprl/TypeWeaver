declare function isValidStatusCode(code: number): boolean;
declare function _isValidUTF8(buf: Uint8Array): boolean;
declare const _default: {
    isValidStatusCode: typeof isValidStatusCode;
    isValidUTF8: typeof _isValidUTF8;
    tokenChars: number[];
};
export default _default;
