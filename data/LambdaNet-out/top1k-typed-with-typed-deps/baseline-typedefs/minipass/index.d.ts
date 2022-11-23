declare const proc: object;
declare const EE: string;
declare const Stream: string;
declare const SD: object;
declare const EOF: number;
declare const MAYBE_EMIT_END: number;
declare const EMITTED_END: number;
declare const EMITTING_END: number;
declare const EMITTED_ERROR: number;
declare const CLOSED: number;
declare const READ: string;
declare const FLUSH: number;
declare const FLUSHCHUNK: number;
declare const ENCODING: number;
declare const DECODER: number;
declare const FLOWING: number;
declare const PAUSED: number;
declare const RESUME: number;
declare const BUFFERLENGTH: number;
declare const BUFFERPUSH: number;
declare const BUFFERSHIFT: number;
declare const OBJECTMODE: number;
declare const DESTROYED: number;
declare const EMITDATA: number;
declare const EMITEND: number;
declare const EMITEND2: number;
declare const ASYNC: number;
declare const defer: Function;
declare const doIter: boolean;
declare const ASYNCITERATOR: boolean;
declare const ITERATOR: boolean;
declare const isEndish: Function;
declare const isArrayBuffer: Function;
declare const isArrayBufferView: Function;
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
