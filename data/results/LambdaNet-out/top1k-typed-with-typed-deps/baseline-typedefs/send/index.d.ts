/*!
 * send
 * Copyright(c) 2012 TJ Holowaychuk
 * Copyright(c) 2014-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var createError: Function;
declare var debug: object;
declare var deprecate: Function;
declare var destroy: Function;
declare var encodeUrl: Function;
declare var escapeHtml: Function;
declare var etag: string;
declare var fresh: Function;
declare var fs: string;
declare var mime: string;
declare var ms: Function;
declare var onFinished: Function;
declare var parseRange: Function;
declare var path: string;
declare var statuses: any[];
declare var Stream: Function;
declare var util: string;
declare var extname: any[];
declare var join: Function;
declare var normalize: Function;
declare var resolve: Function;
declare var sep: any[];
declare var BYTES_RANGE_REGEXP: RegExp;
declare var MAX_MAXAGE: number;
declare var UP_PATH_REGEXP: RegExp;
declare function send(req: Function, path: string, options: object): string;
declare function SendStream(req: object, path: string, options: object): void;
declare function clearHeaders(res: object): void;
declare function collapseLeadingSlashes(str: string): string;
declare function containsDotFile(parts: any[]): boolean;
declare function contentRange(type: string, size: number, range: object): string;
declare function createHtmlDocument(title: string, body: number): string;
declare function createHttpError(status: string, err: string): boolean;
declare function decode(path: string): string;
declare function getHeaderNames(res: HTMLElement): Promise;
declare function hasListeners(emitter: HTMLElement, type: string): boolean;
declare function headersSent(res: object): boolean;
declare function normalizeList(val: number, name: string): any[];
declare function parseHttpDate(date: number): number;
declare function parseTokenList(str: string): any[];
declare function setHeaders(res: object, headers: object): void;
