export declare function Headers(headers: Headers): void;
export declare function Request(input: RequestInfo, options: RequestInit): void;
export declare function Response(bodyInit: any, options: any): void;
export declare namespace Response {
    var error: () => any;
    var redirect: (url: string, status: number) => any;
}
export declare var DOMException: any;
export declare function fetch(input: RequestInfo, init: RequestInit): Promise<unknown>;
export declare namespace fetch {
    var polyfill: boolean;
}
