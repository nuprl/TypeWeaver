/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
declare var buffer: number;
declare var Buffer: Function;
declare function copyProps(src: object, dst: object): void;
declare function SafeBuffer(arg: string, encodingOrOffset: string, length: string): string;
declare namespace SafeBuffer {
    var prototype: any;
    var from: (arg: string, encodingOrOffset: number, length: number) => any;
    var alloc: (size: string, fill: string, encoding: string) => HTMLElement;
    var allocUnsafe: (size: string) => any;
    var allocUnsafeSlow: (size: string) => any;
}
