export = authorization;
declare function authorization(options: any): string;
declare namespace authorization {
    export { authorization, hmacSha1, sign, signQuery, stringToSign, queryStringToSign, canonicalizeHeaders, canonicalizeResource };
}
declare function hmacSha1(options: any): string;
declare function sign(options: any): string;
declare function signQuery(options: any): string;
declare function stringToSign(options: any): string;
declare function queryStringToSign(options: any): string;
declare function canonicalizeHeaders(headers: any): string;
declare function canonicalizeResource(resource: string): string;
