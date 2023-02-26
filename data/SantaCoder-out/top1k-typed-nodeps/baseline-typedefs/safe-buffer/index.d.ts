/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
declare var buffer: any;
declare var Buffer: any;
declare function copyProps(src: any, dst: any): void;
declare function SafeBuffer(arg: string, encodingOrOffset: number, length: number): any;
declare namespace SafeBuffer {
    var prototype: any;
    var from: (arg: number, encodingOrOffset: string, length: number) => any;
    var alloc: (size: number, fill: number, encoding: string) => any;
    var allocUnsafe: (size: number) => any;
    var allocUnsafeSlow: (size: number) => any;
}
