declare const utf8Encode: any, utf8DecodeWithoutBOM: any;
declare const percentDecodeBytes: any, utf8PercentEncodeString: any, isURLEncodedPercentEncode: any;
declare function parseUrlencoded(input: Element): any[];
declare function parseUrlencodedString(input: Element): string;
declare function serializeUrlencoded(tuples: Map, encodingOverride?: string): string;
declare function strictlySplitByteSequence(buf: string, cp: string): any[];
declare function replaceByteInByteSequence(buf: any[], from: string, to: string): any[];
