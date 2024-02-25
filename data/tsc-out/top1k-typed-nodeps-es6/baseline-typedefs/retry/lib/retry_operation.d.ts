export default RetryOperation;
declare function RetryOperation(timeouts: any, options: any): void;
declare class RetryOperation {
    constructor(timeouts: any, options: any);
    _originalTimeouts: any;
    _timeouts: any;
    _options: any;
    _maxRetryTime: any;
    _fn: any;
    _errors: any[];
    _attempts: number;
    _operationTimeout: any;
    _operationTimeoutCb: any;
    _timeout: NodeJS.Timeout;
    _operationStart: number;
    _timer: NodeJS.Timeout;
    _cachedTimeouts: any;
    reset(): void;
    stop(): void;
    retry(err: any): boolean;
    attempt(fn: any, timeoutOps: any): void;
    try(fn: any): void;
    start: (fn: any) => void;
    errors(): any[];
    attempts(): number;
    mainError(): any;
}
