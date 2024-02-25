declare namespace _default {
    export { wrapIterator as iterator };
    export { wrapCallback as callback };
}
export default _default;
declare function wrapIterator(this: ReadableAsyncKit, iterator: Function): Function;
declare function wrapCallback(this: ReadableAsyncKit, callback: Function): Function;
