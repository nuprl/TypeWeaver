export function Headers(headers: any): void;
export class Headers {
    constructor(headers: any);
    map: {};
    append(name: any, value: any): void;
    delete(name: any): void;
    get(name: any): any;
    has(name: any): boolean;
    set(name: any, value: any): void;
    forEach(callback: any, thisArg: any): void;
    keys(): {
        next: () => {
            done: boolean;
            value: any;
        };
    };
    values(): {
        next: () => {
            done: boolean;
            value: any;
        };
    };
    entries(): {
        next: () => {
            done: boolean;
            value: any;
        };
    };
}
export function Request(input: any, options: any): void;
export class Request {
    constructor(input: any, options: any);
    url: string;
    credentials: any;
    headers: Headers;
    method: any;
    mode: any;
    signal: any;
    referrer: any;
    clone(): Request;
}
export function Response(bodyInit: any, options: any): void;
export class Response {
    constructor(bodyInit: any, options: any);
    type: string;
    status: any;
    ok: boolean;
    statusText: string;
    headers: Headers;
    url: any;
    clone(): Response;
}
export namespace Response {
    function error(): Response;
    function redirect(url: any, status: any): Response;
}
export function fetch(input: any, init: any): Promise<any>;
export namespace fetch {
    const polyfill: boolean;
}
export class DOMException {
    private constructor();
    constructor: any;
}
