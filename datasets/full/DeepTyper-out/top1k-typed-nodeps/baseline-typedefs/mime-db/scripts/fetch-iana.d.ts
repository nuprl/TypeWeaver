/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var co: any;
declare var getRawBody: any;
declare var cogent: any;
declare var parser: any;
declare var toArray: any;
declare var typer: any;
declare var writedb: any;
declare var extensionsQuotedRegExp: string;
declare var leadingSpacesRegExp: string;
declare var listColonRegExp: string;
declare var nameWithNotesRegExp: string;
declare var mimeTypeLineRegExp: string;
declare var mimeSubtypesLineRegExp: string;
declare var rfcReferenceRegExp: string;
declare var slurpModeRegExp: string;
declare var symbolRegExp: string;
declare var trimQuotesRegExp: string;
declare var urlReferenceRegExp: string;
declare var CHARSET_DEFAULT_REGEXP: string;
declare var EXTENSIONS_REGEXP: string;
declare var INTENDED_USAGE_REGEXP: string;
declare var MIME_SUBTYPE_LINE_REGEXP: string;
declare var MIME_TYPE_HAS_CHARSET_PARAMETER_REGEXP: string;
declare function addTemplateData(data: any, options: any): any;
declare function extractIntendedUsage(body: any): string;
declare function extractTemplateMime(body: any): string;
declare function extractTemplateCharset(body: any): string;
declare function extractTemplateExtensions(body: any): string;
declare function getTemplateBody(res: any): any;
declare function addSource(data: any, url: string): any;
declare function appendToLine(line: string, str: any): string;
declare function concat(a: any, b: any): any;
declare function generateRowMapper(headers: any): any;
declare function getRfcReferences(reference: any): any;
declare function getUrlReferences(reference: any): any;
declare function loadBluebird(): any;
declare function mimeEql(mime1: string, mime2: string): string;
declare function normalizeHeader(val: string): string;
declare function parseReferences(reference: any): string;
