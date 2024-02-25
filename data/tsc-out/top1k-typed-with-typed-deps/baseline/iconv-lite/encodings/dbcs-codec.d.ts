/// <reference types="node" />
export { DBCSCodec as _dbcs };
declare function DBCSCodec(codecOptions: any, iconv: any): void;
declare class DBCSCodec {
    constructor(codecOptions: any, iconv: any);
    encodingName: any;
    decodeTables: any[][];
    decodeTableSeq: any[];
    gb18030: any;
    defaultCharUnicode: any;
    encodeTable: any[];
    encodeTableSeq: any[];
    defCharSB: any;
    encoder: typeof DBCSEncoder;
    decoder: typeof DBCSDecoder;
    _getDecodeTrieNode(addr: any): any[];
    _addDecodeChunk(chunk: any): void;
    _getEncodeBucket(uCode: any): any;
    _setEncodeChar(uCode: any, dbcsCode: any): void;
    _setEncodeSequence(seq: any, dbcsCode: any): void;
    _fillEncodeTable(nodeIdx: any, prefix: any, skipEncodeChars: any): boolean;
}
declare function DBCSEncoder(options: any, codec: any): void;
declare class DBCSEncoder {
    constructor(options: any, codec: any);
    leadSurrogate: number;
    seqObj: any;
    encodeTable: any;
    encodeTableSeq: any;
    defaultCharSingleByte: any;
    gb18030: any;
    write(str: any): Buffer;
    end(): Buffer;
    findIdx: typeof findIdx;
}
declare function DBCSDecoder(options: any, codec: any): void;
declare class DBCSDecoder {
    constructor(options: any, codec: any);
    nodeIdx: number;
    prevBytes: any[];
    decodeTables: any;
    decodeTableSeq: any;
    defaultCharUnicode: any;
    gb18030: any;
    write(buf: any): string;
    end(): string;
}
import Buffer_1 = require("node/buffer");
import Buffer = Buffer_1.Buffer;
declare function findIdx(table: any, val: any): number;
