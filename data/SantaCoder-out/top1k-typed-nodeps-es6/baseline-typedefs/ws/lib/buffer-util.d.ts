declare function concat(list: number[], totalLength: number): any;
declare function _mask(source: string, mask: string, output: string, offset: number, length: number): void;
declare function _unmask(buffer: Uint8Array, mask: number): void;
declare function toArrayBuffer(buf: ArrayBuffer): any;
declare function toBuffer(data: string): any;
declare const _default: {
    concat: typeof concat;
    mask: typeof _mask;
    toArrayBuffer: typeof toArrayBuffer;
    toBuffer: typeof toBuffer;
    unmask: typeof _unmask;
};
export default _default;
