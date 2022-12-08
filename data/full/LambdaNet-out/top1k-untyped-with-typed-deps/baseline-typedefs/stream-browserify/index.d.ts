declare var EE: Function;
declare var inherits: Function;
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
