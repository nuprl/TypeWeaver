/// <reference types="node" />
declare function InternalCodec(codecOptions: any, iconv: any): void;
declare class InternalCodec {
    constructor(codecOptions: any, iconv: any);
    enc: any;
    bomAware: any;
    encoder: typeof InternalEncoderBase64 | typeof InternalEncoderUtf8 | typeof InternalEncoderCesu8;
    decoder: typeof InternalDecoderCesu8;
    defaultCharUnicode: any;
}
declare function InternalEncoderBase64(options: any, codec: any): void;
declare class InternalEncoderBase64 {
    constructor(options: any, codec: any);
    prevStr: string;
    write(str: any): Buffer;
    end(): Buffer;
}
declare function InternalEncoderUtf8(options: any, codec: any): void;
declare class InternalEncoderUtf8 {
    constructor(options: any, codec: any);
    highSurrogate: string;
    write(str: any): Buffer;
    end(): Buffer;
}
declare function InternalEncoderCesu8(options: any, codec: any): void;
declare class InternalEncoderCesu8 {
    constructor(options: any, codec: any);
    write(str: any): Buffer;
    end(): void;
}
declare function InternalDecoderCesu8(options: any, codec: any): void;
declare class InternalDecoderCesu8 {
    constructor(options: any, codec: any);
    acc: number;
    contBytes: number;
    accBytes: number;
    defaultCharUnicode: any;
    write(buf: any): string;
    end(): number;
}
import Buffer_1 = require("node/buffer");
import Buffer = Buffer_1.Buffer;
export declare namespace utf8 {
    const type: string;
    const bomAware: boolean;
}
export declare namespace cesu8 {
    const type_1: string;
    export { type_1 as type };
    const bomAware_1: boolean;
    export { bomAware_1 as bomAware };
}
export declare const unicode11utf8: string;
export declare namespace ucs2 {
    const type_2: string;
    export { type_2 as type };
    const bomAware_2: boolean;
    export { bomAware_2 as bomAware };
}
export declare const utf16le: string;
export declare namespace binary {
    const type_3: string;
    export { type_3 as type };
}
export declare namespace base64 {
    const type_4: string;
    export { type_4 as type };
}
export declare namespace hex {
    const type_5: string;
    export { type_5 as type };
}
export { InternalCodec as _internal };
