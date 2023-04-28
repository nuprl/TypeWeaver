declare var Buffer: any;
declare function Utf32Codec(codecOptions: any, iconv: any): void;
declare function Utf32Encoder(options: any, codec: any): void;
declare function Utf32Decoder(options: any, codec: any): void;
declare function _writeCodepoint(dst: Uint8Array, offset: number, codepoint: number, badChar: number): number;
declare function Utf32AutoCodec(options: any, iconv: any): void;
declare function Utf32AutoEncoder(options: any, codec: any): void;
declare function Utf32AutoDecoder(options: any, codec: any): void;
