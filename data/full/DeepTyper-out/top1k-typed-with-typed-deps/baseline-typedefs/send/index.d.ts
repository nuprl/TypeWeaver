/*!
 * send
 * Copyright(c) 2012 TJ Holowaychuk
 * Copyright(c) 2014-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var createError: any;
declare var debug: any;
declare var deprecate: any;
declare var destroy: any;
declare var encodeUrl: any;
declare var escapeHtml: any;
declare var etag: any;
declare var fresh: any;
declare var fs: any;
declare var mime: any;
declare var ms: any;
declare var onFinished: any;
declare var parseRange: any;
declare var path: any;
declare var statuses: any;
declare var Stream: any;
declare var util: any;
declare var extname: any;
declare var join: any;
declare var normalize: any;
declare var resolve: any;
declare var sep: any;
declare var BYTES_RANGE_REGEXP: string;
declare var MAX_MAXAGE: number;
declare var UP_PATH_REGEXP: string;
declare function send(req: any, path: string, options: any): any;
declare function SendStream(req: any, path: string, options: any): any;
declare function clearHeaders(res: any): void;
declare function collapseLeadingSlashes(str: any): string;
declare function containsDotFile(parts: any): boolean;
declare function contentRange(type: any, size: number, range: string): string;
declare function createHtmlDocument(title: string, body: any): string;
declare function createHttpError(status: number, err: any): string;
declare function decode(path: string): string;
declare function getHeaderNames(res: any): any;
declare function hasListeners(emitter: any, type: any): boolean;
declare function headersSent(res: any): any;
declare function normalizeList(val: any, name: string): any;
declare function parseHttpDate(date: any): string;
declare function parseTokenList(str: any): any;
declare function setHeaders(res: any, headers: any): void;
