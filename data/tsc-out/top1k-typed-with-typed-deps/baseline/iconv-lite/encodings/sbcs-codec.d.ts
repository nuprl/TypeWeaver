/// <reference types="node" />
export { SBCSCodec as _sbcs };
declare function SBCSCodec(codecOptions: any, iconv: any): void;
declare class SBCSCodec {
    constructor(codecOptions: any, iconv: any);
    decodeBuf: Buffer;
    encodeBuf: Buffer;
    encoder: typeof SBCSEncoder;
    decoder: typeof SBCSDecoder;
}
import Buffer_1 = require("node/buffer");
import Buffer = Buffer_1.Buffer;
declare function SBCSEncoder(options: any, codec: any): void;
declare class SBCSEncoder {
    constructor(options: any, codec: any);
    encodeBuf: any;
    write(str: any): Buffer;
    end(): void;
}
declare function SBCSDecoder(options: any, codec: any): void;
declare class SBCSDecoder {
    constructor(options: any, codec: any);
    decodeBuf: any;
    write(buf: any): string;
    end(): void;
}
