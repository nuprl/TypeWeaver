/// <reference types="node" />
export const RequestSigner: typeof RequestSigner;
export function sign(request: any, credentials: any): any;
declare function RequestSigner(request: any, credentials: any): void;
declare class RequestSigner {
    constructor(request: any, credentials: any);
    request: any;
    credentials: any;
    service: any;
    region: any;
    isCodeCommitGit: boolean;
    matchHost(host: any): any;
    isSingleRegion(): boolean;
    createHost(): string;
    prepareRequest(): void;
    datetime: any;
    sign(): any;
    getDateTime(): any;
    getDate(): any;
    authHeader(): string;
    signature(): string;
    stringToSign(): string;
    canonicalString(): string;
    canonicalHeaders(): string;
    signedHeaders(): string;
    credentialString(): string;
    defaultCredentials(): {
        accessKeyId: string;
        secretAccessKey: string;
        sessionToken: string;
    };
    parsePath(): void;
    parsedPath: {
        path: any;
        query: querystring.ParsedUrlQuery;
    };
    formatPath(): any;
}
import querystring = require("querystring");
export {};
