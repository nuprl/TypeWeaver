declare var url: any;
declare var URL: any;
declare var http: any;
declare var https: any;
declare var Writable: any;
declare var assert: any;
declare var debug: any;
declare var events: string[];
declare var eventHandlers: any;
declare var InvalidUrlError: any;
declare var RedirectionError: any;
declare var TooManyRedirectsError: any;
declare var MaxBodyLengthExceededError: any;
declare var WriteAfterEndError: any;
declare function RedirectableRequest(options: any, responseCallback: void): void;
declare namespace RedirectableRequest {
    var prototype: any;
}
declare function wrap(protocols: any): void;
declare function noop(): void;
declare function urlToOptions(urlObject: any): any;
declare function removeMatchingHeaders(regex: RegExp, headers: any): any;
declare function createErrorType(code: string, message: string, baseClass: string): void;
declare function abortRequest(request: any): void;
declare function isSubdomain(subdomain: any, domain: string): void;
declare function isString(value: any): any;
declare function isFunction(value: any): boolean;
declare function isBuffer(value: any): any;
