declare const _default: {
    iterator: typeof wrapIterator;
    callback: typeof wrapCallback;
};
export default _default;
declare function wrapIterator(iterator: Function): Function;
declare function wrapCallback(callback: string): Function;
