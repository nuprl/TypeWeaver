export default function pTimeout(promise: any, options: any): Promise<any>;
export class TimeoutError extends Error {
    constructor(message: any);
}
/**
An error to be thrown when the request is aborted by AbortController.
DOMException is thrown instead of this Error when DOMException is available.
*/
export class AbortError extends Error {
    constructor(message: any);
    message: any;
}
