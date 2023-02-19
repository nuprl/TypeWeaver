/// <reference types="node" />
declare var Buffer: any;
declare var CRC_TABLE: number[];
declare function newEmptyBuffer(length: number): any;
declare function ensureBuffer(input: Buffer): any;
declare function bufferizeInt(num: number): any;
declare function _crc32(buf: Buffer, previous: number): number;
declare function crc32(): any;
declare namespace crc32 {
    var signed: () => any;
    var unsigned: () => number;
}
