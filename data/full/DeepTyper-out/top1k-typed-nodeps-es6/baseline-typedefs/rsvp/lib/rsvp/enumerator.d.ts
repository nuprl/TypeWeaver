export default class Enumerator {
    constructor(Constructor: any, input: any, abortOnReject: any, label: any);
    _init(Constructor: any, input: any): void;
    _enumerate(input: any): void;
    _checkFullfillment(): void;
    _settleMaybeThenable(entry: any, i: any, firstPass: any): void;
    _eachEntry(entry: any, i: any, firstPass: any): void;
    _settledAt(state: any, i: any, value: any, firstPass: any): void;
    _setResultAt(state: any, i: any, value: any, firstPass: any): void;
    _willSettleAt(promise: any, i: any, firstPass: any): void;
}
export declare function setSettledResult(state: number, i: number, value: any): void;
