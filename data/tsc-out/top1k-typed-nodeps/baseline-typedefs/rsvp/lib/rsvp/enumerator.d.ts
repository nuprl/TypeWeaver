export function setSettledResult(state: any, i: any, value: any): void;
export default class Enumerator {
    constructor(Constructor: any, input: any, abortOnReject: any, label: any, ...args: any[]);
    _instanceConstructor: any;
    promise: any;
    _abortOnReject: any;
    _isUsingOwnPromise: boolean;
    _isUsingOwnResolve: boolean;
    _init(Constructor: any, input: any): void;
    length: any;
    _remaining: any;
    _result: any[];
    _enumerate(input: any): void;
    _checkFullfillment(): void;
    _settleMaybeThenable(entry: any, i: any, firstPass: any): void;
    _eachEntry(entry: any, i: any, firstPass: any): void;
    _settledAt(state: any, i: any, value: any, firstPass: any): void;
    _setResultAt(state: any, i: any, value: any, firstPass: any): void;
    _willSettleAt(promise: any, i: any, firstPass: any): void;
}
