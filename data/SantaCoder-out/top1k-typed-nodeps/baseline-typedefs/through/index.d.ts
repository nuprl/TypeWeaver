declare var Stream: any;
declare function through(write: Function, end: Function, opts: Object): any;
declare namespace through {
    var through: typeof globalThis.through;
}
