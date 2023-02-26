declare var once: any;
declare var noop: () => void;
declare var isRequest: (stream: Readable) => boolean;
declare var isChildProcess: (stream: Readable) => boolean;
declare var eos: (stream: Readable, opts: ReadableOptions, callback: any) => any;
