declare var once: any;
declare var noop: () => void;
declare var isRequest: (stream: ReadableStream) => boolean;
declare var isChildProcess: (stream: ReadableStream) => boolean;
declare var eos: (stream: ReadableStream, opts: any, callback: any) => any;
