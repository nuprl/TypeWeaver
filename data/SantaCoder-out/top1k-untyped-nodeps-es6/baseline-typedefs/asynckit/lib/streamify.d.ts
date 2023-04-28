declare const _default: {
    iterator: typeof wrapIterator;
    callback: typeof wrapCallback;
};
export default _default;
declare function wrapIterator(iterator: any): (item: any, key: any, cb: any) => any;
declare function wrapCallback(callback: Function): (error: any, result: any) => any;
