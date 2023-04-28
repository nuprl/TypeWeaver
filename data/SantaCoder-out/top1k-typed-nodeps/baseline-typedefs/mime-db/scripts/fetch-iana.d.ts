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
declare var extensionsQuotedRegExp: RegExp;
declare var leadingSpacesRegExp: RegExp;
declare var listColonRegExp: RegExp;
declare var nameWithNotesRegExp: RegExp;
declare var mimeTypeLineRegExp: RegExp;
declare var mimeSubtypesLineRegExp: RegExp;
declare var rfcReferenceRegExp: RegExp;
declare var slurpModeRegExp: RegExp;
declare var symbolRegExp: RegExp;
declare var trimQuotesRegExp: RegExp;
declare var urlReferenceRegExp: RegExp;
declare var CHARSET_DEFAULT_REGEXP: RegExp;
declare var EXTENSIONS_REGEXP: RegExp;
declare var INTENDED_USAGE_REGEXP: RegExp;
declare var MIME_SUBTYPE_LINE_REGEXP: RegExp;
declare var MIME_TYPE_HAS_CHARSET_PARAMETER_REGEXP: RegExp;
declare function addTemplateData(data: any, options: any): any;
declare function extractIntendedUsage(body: string): string;
declare function extractTemplateMime(body: string): string;
declare function extractTemplateCharset(body: string): string;
declare function extractTemplateExtensions(body: string): string[];
declare function getTemplateBody(res: any): Generator<any, any, unknown>;
declare function addSource(data: string, url: string): void;
declare function appendToLine(line: string, str: string): string;
declare function concat(a: any[], b: any[]): any[];
declare function generateRowMapper(headers: string[]): (obj: any, val: any, index: number) => any;
declare function getRfcReferences(reference: string): any[];
declare function getUrlReferences(reference: string): any[];
declare function loadBluebird(): any;
declare function mimeEql(mime1: string, mime2: string): boolean;
declare function normalizeHeader(val: string): string;
declare function parseReferences(reference: string): any[];
