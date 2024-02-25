export default Cipher;
declare function Cipher(options: any): void;
declare class Cipher {
    constructor(options: any);
    options: any;
    type: any;
    blockSize: number;
    buffer: any[];
    bufferOff: number;
    _init(): void;
    update(data: any): any[];
    _buffer(data: any, off: any): number;
    _flushBuffer(out: any, off: any): number;
    _updateEncrypt(data: any): any[];
    _updateDecrypt(data: any): any[];
    final(buffer: any): any;
    _pad(buffer: any, off: any): boolean;
    _finalEncrypt(): any[];
    _unpad(buffer: any): any;
    _finalDecrypt(): any;
}
