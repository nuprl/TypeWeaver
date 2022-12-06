export declare function Headers(headers: any[]): void;
export declare function Request(input: HTMLElement, options: object): void;
export declare function Response(bodyInit: object, options: object): void;
export declare namespace Response {
    var error: () => Element;
    var redirect: (url: string, status: number) => any;
}
export declare var DOMException: object;
export declare function fetch(input: HTMLInputElement, init: object): object;
export declare namespace fetch {
    var polyfill: boolean;
}
