/// <reference types="node" />
/// <reference types="depd" />
declare const proc: NodeJS.Process | {
    stdout: any;
    stderr: any;
};
declare const EE: any;
declare const Stream: any;
declare const SD: any;
declare const EOF: unique symbol;
declare const MAYBE_EMIT_END: unique symbol;
declare const EMITTED_END: unique symbol;
declare const EMITTING_END: unique symbol;
declare const EMITTED_ERROR: unique symbol;
declare const CLOSED: unique symbol;
declare const READ: unique symbol;
declare const FLUSH: unique symbol;
declare const FLUSHCHUNK: unique symbol;
declare const ENCODING: unique symbol;
declare const DECODER: unique symbol;
declare const FLOWING: unique symbol;
declare const PAUSED: unique symbol;
declare const RESUME: unique symbol;
declare const BUFFERLENGTH: unique symbol;
declare const BUFFERPUSH: unique symbol;
declare const BUFFERSHIFT: unique symbol;
declare const OBJECTMODE: unique symbol;
declare const DESTROYED: unique symbol;
declare const EMITDATA: unique symbol;
declare const EMITEND: unique symbol;
declare const EMITEND2: unique symbol;
declare const ASYNC: unique symbol;
declare const defer: (fn: any) => Promise<void>;
declare const doIter: boolean;
declare const ASYNCITERATOR: symbol;
declare const ITERATOR: symbol;
declare const isEndish: (ev: any) => boolean;
declare const isArrayBuffer: (b: any) => boolean;
declare const isArrayBufferView: (b: any) => boolean;
declare class Pipe {
    constructor(src: any, dest: any, opts: any);
    unpipe(): void;
    proxyErrors(): void;
    end(): void;
}
declare class PipeProxyErrors extends Pipe {
    unpipe(): void;
    constructor(src: any, dest: any, opts: any);
}
