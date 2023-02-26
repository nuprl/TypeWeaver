export declare class CancelError extends Error {
    constructor(reason: any);
    get isCanceled(): boolean;
}
export default class PCancelable {
    #private;
    static fn(userFunction: any): (...arguments_: any[]) => PCancelable;
    constructor(executor: any);
    then(onFulfilled: any, onRejected: any): any;
    catch(onRejected: any): any;
    finally(onFinally: any): any;
    cancel(reason: any): void;
    get isCanceled(): boolean;
}
