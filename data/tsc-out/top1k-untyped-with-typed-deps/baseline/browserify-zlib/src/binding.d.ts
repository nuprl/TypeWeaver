export const NONE: 0;
export const DEFLATE: 1;
export const INFLATE: 2;
export const GZIP: 3;
export const GUNZIP: 4;
export const DEFLATERAW: 5;
export const INFLATERAW: 6;
export const UNZIP: 7;
/**
 * Emulate Node's zlib C++ layer for use by the JS layer in index.js
 */
export function Zlib(mode: any): void;
export class Zlib {
    /**
     * Emulate Node's zlib C++ layer for use by the JS layer in index.js
     */
    constructor(mode: any);
    dictionary: any;
    err: number;
    flush: number;
    init_done: boolean;
    level: number;
    memLevel: number;
    mode: number;
    strategy: number;
    windowBits: number;
    write_in_progress: boolean;
    pending_close: boolean;
    gzip_id_bytes_read: number;
    close(): void;
    write(flush: any, input: any, in_off: any, in_len: any, out: any, out_off: any, out_len: any): any[] | Zlib;
    writeSync(flush: any, input: any, in_off: any, in_len: any, out: any, out_off: any, out_len: any): any[] | Zlib;
    _write(async: any, flush: any, input: any, in_off: any, in_len: any, out: any, out_off: any, out_len: any, ...args: any[]): any[] | Zlib;
    _afterSync(): any[];
    _process(): void;
    _checkError(): boolean;
    _after(): void;
    _error(message: any): void;
    init(windowBits: any, level: any, memLevel: any, strategy: any, dictionary: any, ...args: any[]): void;
    params(): never;
    reset(): void;
    _init(level: any, windowBits: any, memLevel: any, strategy: any, dictionary: any): void;
    strm: any;
    _setDictionary(): void;
    _reset(): void;
}
