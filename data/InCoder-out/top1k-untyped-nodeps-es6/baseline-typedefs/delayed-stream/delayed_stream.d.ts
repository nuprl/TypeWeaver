export default DelayedStream;
declare function DelayedStream(): void;
declare namespace DelayedStream {
    var create: (source: Observable<T>, options: any) => any;
}
