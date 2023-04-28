/// <reference types="node" />
declare var parse: any;
declare var events: any;
declare var https: any;
declare var http: any;
declare var util: any;
declare var httpsOptions: string[];
declare var bom: number[];
declare var colon: number;
declare var space: number;
declare var lineFeed: number;
declare var carriageReturn: number;
declare var maxBufferAheadAllocation: number;
declare var reUnsafeHeader: RegExp;
declare function hasBom(buf: Buffer): boolean;
declare function EventSource(url: string, eventSourceInitDict: EventSourceInit): void;
declare function Event(type: string, optionalProperties: Object): void;
declare function MessageEvent(type: string, eventInitDict: MessageEventInit): void;
declare function removeUnsafeHeaders(headers: Headers): {};
