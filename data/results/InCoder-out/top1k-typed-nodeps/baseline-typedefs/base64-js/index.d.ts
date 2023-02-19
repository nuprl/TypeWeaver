/// <reference types="node" />
declare var lookup: any[];
declare var revLookup: any[];
declare var Arr: ArrayConstructor | Uint8ArrayConstructor;
declare var code: string;
declare function getLens(b64: Buffer): number[];
declare function byteLength(b64: any): number;
declare function _byteLength(b64: any, validLen: number, placeHoldersLen: number): number;
declare function toByteArray(b64: Buffer): any[] | Uint8Array;
declare function tripletToBase64(num: number): any;
declare function encodeChunk(uint8: Uint8Array, start: number, end: number): string;
declare function fromByteArray(uint8: Uint8Array): string;
