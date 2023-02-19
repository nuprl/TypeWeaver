/// <reference types="node" />
declare var stream: any;
declare var eos: any;
declare var inherits: any;
declare var shift: any;
declare var SIGNAL_FLUSH: Buffer;
declare var onuncork: (self: EventEmitter, fn: Function) => void;
declare var autoDestroy: (self: any, err: Error) => void;
declare var destroyer: (self: any, end: number) => (err: Error) => void;
declare var end: (ws: WebSocket, fn: Function) => any;
declare var noop: () => void;
declare var toStreams2: (rs: ResultSet) => any;
declare var Duplexify: (writable: Writable, readable: Readable, opts: Object) => any;
