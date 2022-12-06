declare function noop(): void;
export default Promise;
declare function Promise(fn: any): PromiseConstructor;
declare namespace Promise {
    var _onHandle: any;
    var _onReject: any;
    var _noop: typeof noop;
}
