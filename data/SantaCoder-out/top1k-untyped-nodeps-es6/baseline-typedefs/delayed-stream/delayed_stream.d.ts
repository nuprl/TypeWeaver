export default DelayedStream;
declare function DelayedStream(): void;
declare namespace DelayedStream {
    var create: (source: Readable, options: any) => any;
}
