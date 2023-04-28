/// <reference types="node" />
declare const utf8Encode: any, utf8DecodeWithoutBOM: any;
declare const percentDecodeBytes: any, utf8PercentEncodeString: any, isURLEncodedPercentEncode: any;
declare function parseUrlencoded(input: string): any[];
declare function parseUrlencodedString(input: string): any[];
declare function serializeUrlencoded(tuples: any, encodingOverride: any, string: any): string;
declare function strictlySplitByteSequence(buf: Buffer, cp: number): any[];
declare function replaceByteInByteSequence(buf: Buffer, from: number, to: number): Buffer;
