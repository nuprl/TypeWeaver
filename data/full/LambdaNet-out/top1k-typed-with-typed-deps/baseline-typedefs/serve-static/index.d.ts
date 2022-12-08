/*!
 * serve-static
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var encodeUrl: Function;
declare var escapeHtml: Function;
declare var parseUrl: string;
declare var resolve: Function;
declare var send: Function;
declare var url: string;
declare function serveStatic(root: number, options: object): Function;
declare function collapseLeadingSlashes(str: string): string;
declare function createHtmlDocument(title: string, body: number): string;
declare function createNotFoundDirectoryListener(): Function;
declare function createRedirectDirectoryListener(): Function;
