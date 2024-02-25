/// <reference types="node" />
export const unicode11utf7: "utf7";
declare function Utf7Codec(codecOptions: any, iconv: any): void;
declare class Utf7Codec {
    constructor(codecOptions: any, iconv: any);
    iconv: any;
    encoder: typeof Utf7Encoder;
    decoder: typeof Utf7Decoder;
    bomAware: boolean;
}
declare function Utf7IMAPCodec(codecOptions: any, iconv: any): void;
declare class Utf7IMAPCodec {
    constructor(codecOptions: any, iconv: any);
    iconv: any;
    encoder: typeof Utf7IMAPEncoder;
    decoder: typeof Utf7IMAPDecoder;
    bomAware: boolean;
}
declare function Utf7Encoder(options: any, codec: any): void;
declare class Utf7Encoder {
    constructor(options: any, codec: any);
    iconv: any;
    write(str: any): Buffer;
    end(): void;
}
declare function Utf7Decoder(options: any, codec: any): void;
declare class Utf7Decoder {
    constructor(options: any, codec: any);
    iconv: any;
    inBase64: boolean;
    base64Accum: string;
    write(buf: any): string;
    end(): string;
}
declare function Utf7IMAPEncoder(options: any, codec: any): void;
declare class Utf7IMAPEncoder {
    constructor(options: any, codec: any);
    iconv: any;
    inBase64: boolean;
    base64Accum: Buffer;
    base64AccumIdx: number;
    write(str: any): Buffer;
    end(): Buffer;
}
declare function Utf7IMAPDecoder(options: any, codec: any): void;
declare class Utf7IMAPDecoder {
    constructor(options: any, codec: any);
    iconv: any;
    inBase64: boolean;
    base64Accum: string;
    write(buf: any): string;
    end(): string;
}
import Buffer_1 = require("node/buffer");
import Buffer = Buffer_1.Buffer;
export { Utf7Codec as utf7, Utf7IMAPCodec as utf7imap };
