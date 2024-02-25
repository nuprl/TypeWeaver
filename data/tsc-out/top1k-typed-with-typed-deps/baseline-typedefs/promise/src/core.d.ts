export = Promise;
declare function Promise(fn: any): void;
declare class Promise {
    constructor(fn: any);
    _deferredState: number;
    _state: number;
    _value: any;
    _deferreds: any;
    then(onFulfilled: any, onRejected: any): any;
}
declare namespace Promise {
    export const _onHandle: any;
    export const _onReject: any;
    export { noop as _noop };
}
declare function noop(): void;
