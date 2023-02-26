/// <reference types="node" />
declare var toString: () => string;
declare var isModern: boolean;
declare function isArrayBuffer(input: any): boolean;
declare function fromArrayBuffer(obj: ArrayBuffer, byteOffset: number, length: number): Buffer;
declare function fromString(string: string, encoding: string): Buffer;
declare function bufferFrom(value: string, encodingOrOffset: number, length: number): Buffer;
