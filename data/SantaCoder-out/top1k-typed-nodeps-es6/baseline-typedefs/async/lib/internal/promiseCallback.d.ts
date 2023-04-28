declare const PROMISE_SYMBOL: unique symbol;
declare function promiseCallback(): (err: any, ...args: any[]) => any;
export { promiseCallback, PROMISE_SYMBOL };
