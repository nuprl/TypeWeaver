/// <reference types="node" />
declare var toString: () => string;
declare var isModern: boolean;
declare function isArrayBuffer(input: Buffer): boolean;
declare function fromArrayBuffer(obj: ArrayBuffer, byteOffset: number, length: number): Buffer;
declare function fromString(string: string | Buffer | DataView, encoding: BufferEncoding): Buffer;
declare function bufferFrom(value: ArrayBuffer | ArrayBufferView, encodingOrOffset: number, length: number): Buffer;
