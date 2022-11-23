declare var stream: any;
declare var inherits: any;
declare var SIGNAL_FLUSH: any;
declare function WriteStream(opts: any, write: any, flush: any): any;
declare namespace WriteStream {
    var obj: (opts: any, worker: any, flush: any) => any;
}
