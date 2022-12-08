/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
declare var buffer: any;
declare var Buffer: any;
declare function copyProps(src: any, dst: any): void;
declare function SafeBuffer(arg: any, encodingOrOffset: any, length: number): any;
declare namespace SafeBuffer {
    var prototype: any;
    var from: (arg: any, encodingOrOffset: any, length: number) => any;
    var alloc: (size: any, fill: any, encoding: string) => any;
    var allocUnsafe: (size: any) => any;
    var allocUnsafeSlow: (size: any) => any;
}
