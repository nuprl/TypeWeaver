declare const utf8Encoder: TextEncoder;
declare const utf8Decoder: TextDecoder;
declare function utf8Encode(string: string): Uint8Array;
declare function utf8DecodeWithoutBOM(bytes: Uint8Array): string;
