export default DelayedStream;
declare function DelayedStream(): void;
declare namespace DelayedStream {
    var create: (source: ReadableStream<any>, options: TransformOptions) => any;
}
