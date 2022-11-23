declare var Buffer: HTMLElement;
declare var CRC_TABLE: object;
declare function newEmptyBuffer(length: string): object;
declare function ensureBuffer(input: object): any[];
declare function bufferizeInt(num: string): object;
declare function _crc32(buf: any[], previous: string): number;
declare function crc32(): string;
declare namespace crc32 {
    var signed: () => any;
    var unsigned: () => number;
}
