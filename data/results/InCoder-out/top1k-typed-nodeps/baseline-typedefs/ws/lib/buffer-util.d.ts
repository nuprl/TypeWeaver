/// <reference types="node" />
declare const EMPTY_BUFFER: any;
declare function concat(list: number[], totalLength: number): any;
declare function _mask(source: number, mask: number, output: number, offset: number, length: number): void;
declare function _unmask(buffer: Buffer, mask: Buffer): void;
declare function toArrayBuffer(buf: Buffer): ArrayBufferLike;
declare function toBuffer(data: Buffer): any;
