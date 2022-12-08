declare var Buffer: any;
declare var CRC_TABLE: number[];
declare function newEmptyBuffer(length: number): any;
declare function ensureBuffer(input: any): any;
declare function bufferizeInt(num: number): any;
declare function _crc32(buf: any, previous: any): any;
declare function crc32(): any;
declare namespace crc32 {
    var signed: () => any;
    var unsigned: () => number;
}
