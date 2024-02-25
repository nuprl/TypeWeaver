export default WriteStream;
declare function WriteStream(opts: any, write: any, flush: any): WriteStream;
declare class WriteStream {
    constructor(opts: any, write: any, flush: any);
    destroyed: boolean;
    _worker: any;
    _flush: any;
    _write(data: any, enc: any, cb: any): void;
    end(data: any, enc: any, cb: any, ...args: any[]): any;
    destroy(err: any): void;
}
declare namespace WriteStream {
    function obj(opts: any, worker: any, flush: any): any;
}
