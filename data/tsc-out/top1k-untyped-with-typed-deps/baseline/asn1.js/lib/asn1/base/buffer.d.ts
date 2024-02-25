/// <reference types="node" />
export function DecoderBuffer(base: any, options: any): void;
export class DecoderBuffer {
    constructor(base: any, options: any);
    base: Buffer;
    offset: number;
    length: number;
    save(): {
        offset: number;
        reporter: any;
    };
    restore(save: any): DecoderBuffer;
    isEmpty(): boolean;
    readUInt8(fail: any): any;
    skip(bytes: any, fail: any): any;
    raw(save: any): Buffer;
}
export namespace DecoderBuffer {
    function isDecoderBuffer(data: any): boolean;
}
export function EncoderBuffer(value: any, reporter: any): any;
export class EncoderBuffer {
    constructor(value: any, reporter: any);
    length: number;
    value: string | number | any[] | Buffer;
    join(out: any, offset: any): any;
}
export namespace EncoderBuffer {
    function isEncoderBuffer(data: any): boolean;
}
import Buffer_1 = require("node/buffer");
import Buffer = Buffer_1.Buffer;
