/// <reference types="node" />
declare const utf8Encoder: TextEncoder;
declare const utf8Decoder: TextDecoder;
declare function utf8Encode(string: string | Buffer | DataView): Uint8Array;
declare function utf8DecodeWithoutBOM(bytes: Uint8Array): string;
