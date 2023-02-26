declare function isPromise(obj: any): boolean;
declare var runAsync: (func: any, cb: any) => () => Promise<unknown>;
