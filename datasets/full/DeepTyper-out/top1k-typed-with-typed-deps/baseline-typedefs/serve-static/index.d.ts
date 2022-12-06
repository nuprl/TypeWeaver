/*!
 * serve-static
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var encodeUrl: any;
declare var escapeHtml: any;
declare var parseUrl: any;
declare var resolve: any;
declare var send: any;
declare var url: any;
declare function serveStatic(root: string, options: any): void;
declare function collapseLeadingSlashes(str: string): string;
declare function createHtmlDocument(title: string, body: any): string;
declare function createNotFoundDirectoryListener(): void;
declare function createRedirectDirectoryListener(): void;
