declare var aws4: any, url: any, querystring: any, crypto: Crypto, lru: any, credentialsCache: any;
declare function hmac(key: string, string: any, encoding: string): string;
declare function hash(string: any, encoding: string): any;
declare function encodeRfc3986(urlEncodedString: string): string;
declare function encodeRfc3986Full(str: string): string;
declare var HEADERS_TO_IGNORE: any;
declare function RequestSigner(request: any, credentials: any): any;
