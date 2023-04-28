import stream from 'readable-stream';
declare var Duplexify: (writable: stream.Writable, readable: stream.Readable, opts: DuplexifyOptions) => any;
export default Duplexify;
