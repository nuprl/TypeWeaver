declare function isAsync(fn: Function): boolean;
declare function isAsyncGenerator(fn: any): boolean;
declare function isAsyncIterable(obj: any): boolean;
declare function wrapAsync(asyncFn: Function): Function;
export default wrapAsync;
export { isAsync, isAsyncGenerator, isAsyncIterable };
