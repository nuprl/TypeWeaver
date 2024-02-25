export default function pTimeout(promise: any, options: any): Promise<any>;
export class TimeoutError extends Error {
    constructor(message: any);
}
export class AbortError extends Error {
    constructor(message: any);
    message: any;
}
