declare const whatwgEncoding: any;
declare function prescanMetaCharset(uint8Array: Uint8Array): any;
declare function getAttribute(uint8Array: Uint8Array, i: number, l: number): {
    attr: {
        name: string;
        value: string;
    };
    i: number;
} | {
    i: number;
    attr?: undefined;
};
declare function extractCharacterEncodingFromMeta(string: string): any;
declare function isSpaceCharacter(c: string): boolean;
