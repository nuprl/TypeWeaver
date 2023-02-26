/// <reference types="node" />
declare const zlib: any;
declare const bufferUtil: any;
declare const Limiter: any;
declare const kStatusCode: any;
declare const TRAILER: Buffer;
declare const kPerMessageDeflate: unique symbol;
declare const kTotalLength: unique symbol;
declare const kCallback: unique symbol;
declare const kBuffers: unique symbol;
declare const kError: unique symbol;
declare let zlibLimiter: any;
declare class PerMessageDeflate {
    constructor(options: any, isServer: any, maxPayload: any);
    static get extensionName(): string;
    offer(): {};
    accept(configurations: any): any;
    cleanup(): void;
    acceptAsServer(offers: any): any;
    acceptAsClient(response: any): any;
    normalizeParams(configurations: any): any;
    decompress(data: any, fin: any, callback: any): void;
    compress(data: any, fin: any, callback: any): void;
    _decompress(data: any, fin: any, callback: any): void;
    _compress(data: any, fin: any, callback: any): void;
}
declare function deflateOnData(chunk: Uint8Array): void;
declare function inflateOnData(chunk: Uint8Array): void;
declare function inflateOnError(err: Error): void;
