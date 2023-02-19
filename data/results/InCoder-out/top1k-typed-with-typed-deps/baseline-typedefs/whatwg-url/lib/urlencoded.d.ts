declare const utf8Encode: any, utf8DecodeWithoutBOM: any;
declare const percentDecodeBytes: any, utf8PercentEncodeString: any, isURLEncodedPercentEncode: any;
declare function parseUrlencoded(input: any): any[];
declare function parseUrlencodedString(input: any): any[];
declare function serializeUrlencoded(tuples: any[], encodingOverride: any, string: any): string;
declare function strictlySplitByteSequence(buf: Uint8Array, cp: number): any[];
declare function replaceByteInByteSequence(buf: Uint8Array, from: number, to: number): Uint8Array;
