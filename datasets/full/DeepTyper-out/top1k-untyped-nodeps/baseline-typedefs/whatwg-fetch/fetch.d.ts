export declare function Headers(headers: any): any;
export declare function Request(input: any, options: any): Request;
export declare function Response(bodyInit: string, options: any): any;
export declare namespace Response {
    var error: () => Response;
    var redirect: (url: string, status: number) => any;
}
export declare var DOMException: any;
export declare function fetch(input: string, init: any): Promise<Response>;
export declare namespace fetch {
    var polyfill: boolean;
}
