/// <reference types="node" />
export namespace utf32le {
    const type: string;
    const isLE: boolean;
}
export namespace utf32be {
    const type_1: string;
    export { type_1 as type };
    const isLE_1: boolean;
    export { isLE_1 as isLE };
}
export const ucs4le: "utf32le";
export const ucs4be: "utf32be";
export const ucs4: "utf32";
declare function Utf32Codec(codecOptions: any, iconv: any): void;
declare class Utf32Codec {
    constructor(codecOptions: any, iconv: any);
    iconv: any;
    bomAware: boolean;
    isLE: any;
    encoder: typeof Utf32Encoder;
    decoder: typeof Utf32Decoder;
}
declare function Utf32AutoCodec(options: any, iconv: any): void;
declare class Utf32AutoCodec {
    constructor(options: any, iconv: any);
    iconv: any;
    encoder: typeof Utf32AutoEncoder;
    decoder: typeof Utf32AutoDecoder;
}
declare function Utf32Encoder(options: any, codec: any): void;
declare class Utf32Encoder {
    constructor(options: any, codec: any);
    isLE: any;
    highSurrogate: number;
    write(str: any): Buffer;
    end(): Buffer;
}
declare function Utf32Decoder(options: any, codec: any): void;
declare class Utf32Decoder {
    constructor(options: any, codec: any);
    isLE: any;
    badChar: any;
    overflow: any[];
    write(src: any): string;
    end(): void;
}
declare function Utf32AutoEncoder(options: any, codec: any): void;
declare class Utf32AutoEncoder {
    constructor(options: any, codec: any);
    encoder: any;
    write(str: any): any;
    end(): any;
}
declare function Utf32AutoDecoder(options: any, codec: any): void;
declare class Utf32AutoDecoder {
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
export { Utf32Codec as _utf32, Utf32AutoCodec as utf32 };
