export function mask(source: any, mask: any, output: any, offset: any, length: any): void;
export function unmask(buffer: any, mask: any): void;
export function concat(list: Buffer[], totalLength: number): Buffer;
declare function _mask(source: Buffer, mask: Buffer, output: Buffer, offset: number, length: number): void;
export function toArrayBuffer(buf: Buffer): ArrayBuffer;
export function toBuffer(data: any): Buffer;
declare function _unmask(buffer: Buffer, mask: Buffer): void;
export { _mask as mask, _unmask as unmask };
