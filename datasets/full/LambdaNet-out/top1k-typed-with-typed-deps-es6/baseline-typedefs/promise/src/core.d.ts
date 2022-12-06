declare function noop(): void;
export default Promise;
declare function Promise(fn: string): void;
declare namespace Promise {
    var _onHandle: any;
    var _onReject: any;
    var _noop: typeof noop;
}
