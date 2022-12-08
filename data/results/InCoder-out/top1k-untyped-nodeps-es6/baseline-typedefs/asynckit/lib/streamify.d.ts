declare const _default: {
    iterator: typeof wrapIterator;
    callback: typeof wrapCallback;
};
export default _default;
declare function wrapIterator(iterator: AsyncIterator<any>): (item: any, key: any, cb: Function) => any;
declare function wrapCallback(callback: Function): (error: Error, result: Result) => any;
