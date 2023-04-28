declare function noop(): void;
declare var logger: {
    warn: typeof noop;
    error: typeof noop;
}, padding: string, chrTable: string, binTable: number[];
declare function utf8Encode(str: string): any[];
declare function utf8Decode(bytes: Array<number>): string;
declare function encode(str: string): string;
declare function decode(data: string): string;
