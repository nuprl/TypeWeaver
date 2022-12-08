/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/// <reference types="node" />
declare var buffer: any;
declare var Buffer: any;
declare function copyProps(src: Object, dst: Object): void;
declare function SafeBuffer(arg: Buffer, encodingOrOffset: Buffer, length: number): any;
declare namespace SafeBuffer {
    var prototype: any;
    var from: (arg: number, encodingOrOffset: BufferEncoding, length: number) => any;
    var alloc: (size: umber, fill: umber, encoding: umber) => any;
    var allocUnsafe: (size: umber) => any;
    var allocUnsafeSlow: (size: umber) => any;
}
