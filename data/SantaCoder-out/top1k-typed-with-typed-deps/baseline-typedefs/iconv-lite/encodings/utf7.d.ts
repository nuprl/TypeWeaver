declare var Buffer: any;
declare function Utf7Codec(codecOptions: any, iconv: any): void;
declare var nonDirectChars: RegExp;
declare function Utf7Encoder(options: any, codec: any): void;
declare function Utf7Decoder(options: any, codec: any): void;
declare var base64Regex: RegExp;
declare var base64Chars: any[];
declare var plusChar: number, minusChar: number, andChar: number;
declare function Utf7IMAPCodec(codecOptions: any, iconv: any): void;
declare function Utf7IMAPEncoder(options: any, codec: any): void;
declare function Utf7IMAPDecoder(options: any, codec: any): void;
declare var base64IMAPChars: any[];
