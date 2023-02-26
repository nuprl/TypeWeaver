declare const Writable: any;
declare const PerMessageDeflate: any;
declare const BINARY_TYPES: any, EMPTY_BUFFER: any, kStatusCode: any, kWebSocket: any;
declare const concat: any, toArrayBuffer: any, unmask: any;
declare const isValidStatusCode: any, isValidUTF8: any;
declare const GET_INFO = 0;
declare const GET_PAYLOAD_LENGTH_16 = 1;
declare const GET_PAYLOAD_LENGTH_64 = 2;
declare const GET_MASK = 3;
declare const GET_DATA = 4;
declare const INFLATING = 5;
declare class Receiver extends Writable {
    constructor(options?: {});
    _write(chunk: any, encoding: any, cb: any): any;
    consume(n: any): any;
    startLoop(cb: any): void;
    getInfo(): any;
    getPayloadLength16(): any;
    getPayloadLength64(): any;
    haveLength(): any;
    getMask(): void;
    getData(cb: any): any;
    decompress(data: any, cb: any): void;
    dataMessage(): any;
    controlMessage(data: any): any;
}
declare function error(ErrorCtor: Function, message: string, prefix: string, statusCode: number, errorCode: number): any;
