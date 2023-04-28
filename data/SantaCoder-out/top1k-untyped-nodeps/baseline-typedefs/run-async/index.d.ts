declare function isPromise(obj: any): boolean;
declare var runAsync: (func: Function, cb: Function) => () => Promise<unknown>;
