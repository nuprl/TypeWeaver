export function fromCallback(fn: any): (...args: any[]) => Promise<any>;
export function fromPromise(fn: any): (...args: any[]) => any;
