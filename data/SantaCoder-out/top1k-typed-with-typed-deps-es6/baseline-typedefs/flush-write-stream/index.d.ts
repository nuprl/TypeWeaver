export default WriteStream;
declare function WriteStream(opts: any, write: Function, flush: Function): any;
declare namespace WriteStream {
    var obj: (opts: any, worker: any, flush: any) => any;
}
