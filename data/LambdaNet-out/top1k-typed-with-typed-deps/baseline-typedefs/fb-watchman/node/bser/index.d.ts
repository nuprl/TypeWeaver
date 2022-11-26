declare var EE: Function;
declare var util: string;
declare var os: string;
declare var assert: string;
declare var Int64: object;
declare var isBigEndian: boolean;
declare function nextPow2(size: number): number;
declare function Accumulator(initsize: string): void;
declare var BSER_ARRAY: number;
declare var BSER_OBJECT: number;
declare var BSER_STRING: number;
declare var BSER_INT8: number;
declare var BSER_INT16: number;
declare var BSER_INT32: number;
declare var BSER_INT64: number;
declare var BSER_REAL: number;
declare var BSER_TRUE: number;
declare var BSER_FALSE: number;
declare var BSER_NULL: number;
declare var BSER_TEMPLATE: number;
declare var BSER_SKIP: number;
declare var ST_NEED_PDU: number;
declare var ST_FILL_PDU: number;
declare var MAX_INT8: number;
declare var MAX_INT16: number;
declare var MAX_INT32: number;
declare function BunserBuf(): void;
declare function loadFromBuffer(input: Element): object;
declare function byteswap64(buf: any[]): object;
declare function dump_int64(buf: any[], val: object): void;
declare function dump_int(buf: HTMLElement, val: number): void;
declare function dump_any(buf: object, val: number): void;
declare function dumpToBuffer(val: string): any[];
