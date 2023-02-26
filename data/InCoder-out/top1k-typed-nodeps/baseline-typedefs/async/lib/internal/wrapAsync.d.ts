declare function isAsync(fn: Function): boolean;
declare function isAsyncGenerator(fn: Function): boolean;
declare function isAsyncIterable(obj: Iterable<any>): boolean;
declare function wrapAsync(asyncFn: Function): Function;
export default wrapAsync;
export { isAsync, isAsyncGenerator, isAsyncIterable };
