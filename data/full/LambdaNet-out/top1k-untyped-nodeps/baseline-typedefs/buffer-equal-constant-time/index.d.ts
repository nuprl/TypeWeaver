declare var Buffer: HTMLElement;
declare var SlowBuffer: HTMLElement;
declare function bufferEq(a: any[], b: any[]): boolean;
declare namespace bufferEq {
    var install: () => void;
    var restore: () => void;
}
declare var origBufEqual: number;
declare var origSlowBufEqual: boolean;
