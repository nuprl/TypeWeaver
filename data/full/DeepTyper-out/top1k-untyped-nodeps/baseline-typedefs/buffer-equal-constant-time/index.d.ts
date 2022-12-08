declare var Buffer: any;
declare var SlowBuffer: any;
declare function bufferEq(a: any, b: any): any;
declare namespace bufferEq {
    var install: () => void;
    var restore: () => void;
}
declare var origBufEqual: any;
declare var origSlowBufEqual: any;
