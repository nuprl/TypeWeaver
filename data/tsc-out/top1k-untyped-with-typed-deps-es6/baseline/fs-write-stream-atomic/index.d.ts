export default WriteStreamAtomic;
declare function WriteStreamAtomic(path: any, options: any): WriteStreamAtomic;
declare class WriteStreamAtomic {
    constructor(path: any, options: any);
    __isWin: any;
    __atomicTarget: any;
    __atomicTmp: string;
    __atomicChown: any;
    __atomicClosed: boolean;
    __atomicStream: any;
    emit(event: any, ...args: any[]): any;
    _write(buffer: any, encoding: any, cb: any): any;
}
