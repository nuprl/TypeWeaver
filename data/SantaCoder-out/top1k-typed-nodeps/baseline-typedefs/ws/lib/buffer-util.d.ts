/// <reference types="node" />
declare const EMPTY_BUFFER: any;
declare function concat(list: Buffer[], totalLength: number): any;
declare function _mask(source: Buffer, mask: Buffer, output: Buffer, offset: number, length: number): void;
declare function _unmask(buffer: Buffer, mask: Buffer): void;
declare function toArrayBuffer(buf: Buffer): ArrayBufferLike;
declare function toBuffer(data: Buffer): any;
