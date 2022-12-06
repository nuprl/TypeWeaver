declare var EE: any;
declare var inherits: any;
declare function Stream(): void;
declare namespace Stream {
    var Readable: any;
    var Writable: any;
    var Duplex: any;
    var Transform: any;
    var PassThrough: any;
    var finished: any;
    var pipeline: any;
    var Stream: typeof globalThis.Stream;
}
