declare var once: any;
declare var noop: () => void;
declare var isRequest: (stream: Readable) => boolean;
declare var isChildProcess: (stream: Readable) => boolean;
declare var eos: (stream: ReadableStream, opts: ReadableStreamDefaultReadWrite, callback: callback) => any;
