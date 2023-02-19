export declare const fromCallback: (fn: Function) => (...args: any[]) => Promise<unknown>;
export declare const fromPromise: (fn: Function) => (...args: any[]) => any;
