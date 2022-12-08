declare class CancelToken {
    constructor(executor: any);
    throwIfRequested(): void;
    subscribe(listener: any): void;
    unsubscribe(listener: any): void;
    static source(): {
        token: CancelToken;
        cancel: any;
    };
}
export default CancelToken;
