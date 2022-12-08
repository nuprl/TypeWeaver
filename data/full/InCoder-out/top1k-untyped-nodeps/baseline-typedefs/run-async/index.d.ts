declare function isPromise(obj: unknown): boolean;
declare var runAsync: (func: Function, cb: Function) => () => Promise<unknown>;
