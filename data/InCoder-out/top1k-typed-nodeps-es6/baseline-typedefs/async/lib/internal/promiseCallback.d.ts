declare const PROMISE_SYMBOL: unique symbol;
declare function promiseCallback(): (err: rror, ...args: ny[]) => any;
export { promiseCallback, PROMISE_SYMBOL };
