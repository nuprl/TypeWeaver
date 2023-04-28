/// <reference types="node" />
declare var stream: any;
declare var eos: any;
declare var inherits: any;
declare var shift: any;
declare var SIGNAL_FLUSH: Buffer;
declare var onuncork: (self: Writable, fn: Function) => void;
declare var autoDestroy: (self: Duplex, err: any) => void;
declare var destroyer: (self: Duplex, end: boolean) => (err: Error) => void;
declare var end: (ws: stream.Writable, fn: Function) => any;
declare var noop: () => void;
declare var toStreams2: (rs: ReadableStream) => any;
declare var Duplexify: (writable: stream.Writable, readable: stream.Readable, opts: DuplexifyOptions) => any;
