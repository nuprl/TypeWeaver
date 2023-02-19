declare var crypto: string;
declare function sha(key: string, body: string, algorithm: string): string;
declare function rsa(key: string, body: string): string;
declare function rfc3986(str: string): string;
declare function map(obj: object): any[];
declare function compare(a: number, b: number): number;
declare function generateBase(httpMethod: string, base_uri: string, params: any[]): string;
declare function hmacsign(httpMethod: string, base_uri: string, params: Function, consumer_secret: number, token_secret: string): string;
declare function hmacsign256(httpMethod: string, base_uri: string, params: Function, consumer_secret: number, token_secret: number): string;
declare function rsasign(httpMethod: string, base_uri: string, params: Function, private_key: string, token_secret: string): string;
declare function plaintext(consumer_secret: number, token_secret: number): string;
declare function sign(signMethod: string, httpMethod: string, base_uri: string, params: Function, consumer_secret: string, token_secret: string): Promise;
