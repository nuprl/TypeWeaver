declare namespace _default {
    export { RequestError };
    export { StatusCodeError };
    export { TransformError };
}
export default _default;
declare function RequestError(cause: any, options: any, response: any): void;
declare class RequestError {
    constructor(cause: any, options: any, response: any);
    name: string;
    message: string;
    cause: any;
    error: any;
    options: any;
    response: any;
    constructor: typeof RequestError;
}
declare function StatusCodeError(statusCode: any, body: any, options: any, response: any): void;
declare class StatusCodeError {
    constructor(statusCode: any, body: any, options: any, response: any);
    name: string;
    statusCode: any;
    message: string;
    error: any;
    options: any;
    response: any;
    constructor: typeof StatusCodeError;
}
declare function TransformError(cause: any, options: any, response: any): void;
declare class TransformError {
    constructor(cause: any, options: any, response: any);
    name: string;
    message: string;
    cause: any;
    error: any;
    options: any;
    response: any;
    constructor: typeof TransformError;
}
