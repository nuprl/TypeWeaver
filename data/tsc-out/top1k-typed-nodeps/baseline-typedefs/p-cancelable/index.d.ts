export class CancelError extends Error {
    constructor(reason: any);
    get isCanceled(): boolean;
}
export default class PCancelable {
    static fn(userFunction: any): (...arguments_: any[]) => PCancelable;
    constructor(executor: any);
    then(onFulfilled: any, onRejected: any): Promise<any>;
    catch(onRejected: any): Promise<any>;
    finally(onFinally: any): Promise<any>;
    cancel(reason: any): void;
    get isCanceled(): boolean;
    #private;
}
