/// <reference types="node" />
declare function concat(list: number[], totalLength: number): any;
declare function _mask(source: number, mask: number, output: number, offset: number, length: number): void;
declare function _unmask(buffer: Buffer, mask: Buffer): void;
declare function toArrayBuffer(buf: Buffer): ArrayBufferLike;
declare function toBuffer(data: Buffer): any;
declare const _default: {
    concat: typeof concat;
    mask: typeof _mask;
    toArrayBuffer: typeof toArrayBuffer;
    toBuffer: typeof toBuffer;
    unmask: typeof _unmask;
};
export default _default;
