declare const proc: any;
declare const EE: any;
declare const Stream: any;
declare const SD: any;
declare const EOF: any;
declare const MAYBE_EMIT_END: symbol;
declare const EMITTED_END: symbol;
declare const EMITTING_END: symbol;
declare const EMITTED_ERROR: symbol;
declare const CLOSED: symbol;
declare const READ: symbol;
declare const FLUSH: symbol;
declare const FLUSHCHUNK: symbol;
declare const ENCODING: symbol;
declare const DECODER: symbol;
declare const FLOWING: symbol;
declare const PAUSED: symbol;
declare const RESUME: symbol;
declare const BUFFERLENGTH: symbol;
declare const BUFFERPUSH: symbol;
declare const BUFFERSHIFT: symbol;
declare const OBJECTMODE: symbol;
declare const DESTROYED: symbol;
declare const EMITDATA: symbol;
declare const EMITEND: symbol;
declare const EMITEND2: symbol;
declare const ASYNC: symbol;
declare const defer: any;
declare const doIter: boolean;
declare const ASYNCITERATOR: symbol;
declare const ITERATOR: symbol;
declare const isEndish: any;
declare const isArrayBuffer: number;
declare const isArrayBufferView: number;
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
