declare const _default: {
    iterator: typeof wrapIterator;
    callback: typeof wrapCallback;
};
export default _default;
declare function wrapIterator(iterator: Function): (item: any, key: string, cb: Function) => any;
declare function wrapCallback(callback: Function): (error: Error, result: any) => any;
