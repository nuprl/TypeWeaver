/// <reference types="node" />
declare var stream: any;
declare var eos: any;
declare var inherits: any;
declare var shift: any;
declare var SIGNAL_FLUSH: Buffer;
declare var onuncork: (self: Worker, fn: Function) => void;
declare var autoDestroy: (self: IAutoDestroyable, err: any) => void;
declare var destroyer: (self: IStream, end: boolean) => (err: Error) => void;
declare var end: (ws: WebSocket, fn: any) => any;
declare var noop: () => void;
declare var toStreams2: (rs: Result<any>) => any;
declare var Duplexify: (writable: Writable, readable: Readable, opts: any) => any;
