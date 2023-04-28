declare var Stream: any;
declare var util: any;
declare function DelayedStream(): void;
declare namespace DelayedStream {
    var create: (source: Readable, options: any) => any;
}
