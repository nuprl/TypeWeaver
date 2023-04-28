/// <reference types="node" />
declare var stream: any;
declare var eos: any;
declare var inherits: any;
declare var shift: any;
declare var SIGNAL_FLUSH: Buffer;
declare var onuncork: (self: Writable, fn: Function) => void;
declare var autoDestroy: (self: Duplex, err: any) => void;
declare var destroyer: (self: Function, end: Function) => (err: any) => void;
declare var end: (ws: WebSocket, fn: Function) => any;
declare var noop: () => void;
declare var toStreams2: (rs: any) => any;
declare var Duplexify: (writable: Writable, readable: Readable, opts: any) => any;
