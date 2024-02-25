declare namespace _default {
    export { utf8Encode };
    export { utf8DecodeWithoutBOM };
}
export default _default;
declare function utf8Encode(string: any): Uint8Array;
declare function utf8DecodeWithoutBOM(bytes: any): string;
