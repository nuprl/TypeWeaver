/// <reference types="node" />
declare var Buffer: any;
declare var SlowBuffer: any;
declare function bufferEq(a: Buffer, b: Buffer): boolean;
declare namespace bufferEq {
    var install: () => void;
    var restore: () => void;
}
declare var origBufEqual: any;
declare var origSlowBufEqual: any;
