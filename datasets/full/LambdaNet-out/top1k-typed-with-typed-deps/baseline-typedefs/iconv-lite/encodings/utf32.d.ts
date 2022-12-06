declare var Buffer: object;
declare function Utf32Codec(codecOptions: object, iconv: Function): void;
declare function Utf32Encoder(options: object, codec: object): void;
declare function Utf32Decoder(options: object, codec: object): void;
declare function _writeCodepoint(dst: object, offset: number, codepoint: number, badChar: number): number;
declare function Utf32AutoCodec(options: object, iconv: Function): void;
declare function Utf32AutoEncoder(options: object, codec: object): void;
declare function Utf32AutoDecoder(options: object, codec: object): void;
