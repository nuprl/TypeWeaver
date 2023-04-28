/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="depd" />
declare var once: any;
declare var noop: () => void;
declare var isRequest: (stream: any) => boolean;
declare var isChildProcess: (stream: NodeJS.WritableStream) => boolean;
declare var eos: (stream: ReadableStream, opts: Options, callback: Callback) => any;
