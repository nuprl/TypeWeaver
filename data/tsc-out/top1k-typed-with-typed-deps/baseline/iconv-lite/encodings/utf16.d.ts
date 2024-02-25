/// <reference types="node" />
declare function Utf16BECodec(): void;
declare class Utf16BECodec {
    encoder: typeof Utf16BEEncoder;
    decoder: typeof Utf16BEDecoder;
    bomAware: boolean;
}
declare function Utf16Codec(codecOptions: any, iconv: any): void;
declare class Utf16Codec {
    constructor(codecOptions: any, iconv: any);
    iconv: any;
    encoder: typeof Utf16Encoder;
    decoder: typeof Utf16Decoder;
}
declare function Utf16BEEncoder(): void;
declare class Utf16BEEncoder {
    write(str: any): Buffer;
    end(): void;
}
declare function Utf16BEDecoder(): void;
declare class Utf16BEDecoder {
    overflowByte: number;
    write(buf: any): string;
    end(): void;
}
declare function Utf16Encoder(options: any, codec: any): void;
declare class Utf16Encoder {
    constructor(options: any, codec: any);
    encoder: any;
    write(str: any): any;
    end(): any;
}
declare function Utf16Decoder(options: any, codec: any): void;
declare class Utf16Decoder {
    constructor(options: any, codec: any);
    decoder: any;
    initialBufs: any[];
    initialBufsLen: number;
    options: any;
    iconv: any;
    write(buf: any): any;
    end(): any;
}
import Buffer_1 = require("node/buffer");
import Buffer = Buffer_1.Buffer;
export { Utf16BECodec as utf16be, Utf16Codec as utf16 };
