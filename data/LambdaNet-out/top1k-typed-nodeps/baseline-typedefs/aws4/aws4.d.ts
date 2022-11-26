declare var aws4: HTMLElement, url: string, querystring: string, crypto: string, lru: Function, credentialsCache: Map;
declare function hmac(key: string, string: string, encoding: number): string;
declare function hash(string: string, encoding: string): string;
declare function encodeRfc3986(urlEncodedString: string): string;
declare function encodeRfc3986Full(str: string): string;
declare var HEADERS_TO_IGNORE: object;
declare function RequestSigner(request: object, credentials: string): void;
