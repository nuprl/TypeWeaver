/// <reference types="node" />
declare var assert: any;
declare var inherits: any;
declare function isSurrogatePair(msg: string, i: number): boolean;
declare function toArray(msg: any, enc: any): any[];
declare function toHex(msg: Buffer): string;
declare function htonl(w: number): number;
declare function toHex32(msg: Buffer, endian: 'big'): string;
declare function zero2(word: string): string;
declare function zero8(word: string): string;
declare function join32(msg: Uint8Array, start: number, end: number, endian: 'big'): any[];
declare function split32(msg: Uint8Array, endian: 'big'): any[];
declare function rotr32(w: number, b: number): number;
declare function rotl32(w: number, b: number): number;
declare function sum32(a: number, b: number): number;
declare function sum32_3(a: number, b: number, c: number): number;
declare function sum32_4(a: number, b: number, c: number, d: number): number;
declare function sum32_5(a: number, b: number, c: number, d: number, e: number): number;
declare function sum64(buf: Buffer, pos: number, ah: number, al: number): void;
declare function sum64_hi(ah: number, al: number, bh: number, bl: number): number;
declare function sum64_lo(ah: number, al: number, bh: number, bl: number): number;
declare function sum64_4_hi(ah: number, al: number, bh: number, bl: number, ch: number, cl: number, dh: number, dl: number): number;
declare function sum64_4_lo(ah: number, al: number, bh: number, bl: number, ch: number, cl: number, dh: number, dl: number): number;
declare function sum64_5_hi(ah: number, al: number, bh: number, bl: number, ch: number, cl: number, dh: number, dl: number, eh: number, el: number): number;
declare function sum64_5_lo(ah: number, al: number, bh: number, bl: number, ch: number, cl: number, dh: number, dl: number, eh: number, el: number): number;
declare function rotr64_hi(ah: number, al: number, num: number): number;
declare function rotr64_lo(ah: number, al: number, num: number): number;
declare function shr64_hi(ah: number, al: number, num: number): number;
declare function shr64_lo(ah: number, al: number, num: number): number;
