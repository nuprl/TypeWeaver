export function RequestError(cause: any, options: any, response: any): void;
export class RequestError {
    constructor(cause: any, options: any, response: any);
    name: string;
    message: string;
    cause: any;
    error: any;
    options: any;
    response: any;
    constructor: typeof RequestError;
}
export function StatusCodeError(statusCode: any, body: any, options: any, response: any): void;
export class StatusCodeError {
    constructor(statusCode: any, body: any, options: any, response: any);
    name: string;
    statusCode: any;
    message: string;
    error: any;
    options: any;
    response: any;
    constructor: typeof StatusCodeError;
}
export function TransformError(cause: any, options: any, response: any): void;
export class TransformError {
    constructor(cause: any, options: any, response: any);
    name: string;
    message: string;
    cause: any;
    error: any;
    options: any;
    response: any;
    constructor: typeof TransformError;
}
