/// <reference types="node" />
declare function noop(): void;
declare var logger: {
    warn: typeof noop;
    error: typeof noop;
}, padding: string, chrTable: string, binTable: number[];
declare function utf8Encode(str: any): any[];
declare function utf8Decode(bytes: Uint8Array): string;
declare function encode(str: any): string;
declare function decode(data: Buffer): string;
