export function hmacsign(httpMethod: any, base_uri: any, params: any, consumer_secret: any, token_secret: any): string;
export function hmacsign256(httpMethod: any, base_uri: any, params: any, consumer_secret: any, token_secret: any): string;
export function rsasign(httpMethod: any, base_uri: any, params: any, private_key: any, token_secret: any): string;
export function plaintext(consumer_secret: any, token_secret: any): string;
export function sign(signMethod: any, httpMethod: any, base_uri: any, params: any, consumer_secret: any, token_secret: any, ...args: any[]): any;
export function rfc3986(str: any): string;
export function generateBase(httpMethod: any, base_uri: any, params: any): string;
