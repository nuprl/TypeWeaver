declare var Buffer: object;
declare function InternalCodec(codecOptions: object, iconv: object): void;
declare var StringDecoder: any[];
declare function InternalDecoder(options: object, codec: object): void;
declare function InternalEncoder(options: object, codec: object): void;
declare function InternalEncoderBase64(options: object, codec: Function): void;
declare function InternalEncoderCesu8(options: object, codec: Function): void;
declare function InternalDecoderCesu8(options: object, codec: object): void;
declare function InternalEncoderUtf8(options: object, codec: Function): void;
