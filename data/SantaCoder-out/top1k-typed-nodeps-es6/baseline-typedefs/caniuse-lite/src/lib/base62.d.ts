declare function encode(integer: number): string;
declare function decode(base62: string): number;
declare const _default: {
    encode: typeof encode;
    decode: typeof decode;
};
export default _default;
