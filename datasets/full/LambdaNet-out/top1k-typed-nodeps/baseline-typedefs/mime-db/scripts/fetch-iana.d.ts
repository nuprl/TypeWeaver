/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var co: Function;
declare var getRawBody: Function;
declare var cogent: Function;
declare var parser: Function;
declare var toArray: Function;
declare var typer: string;
declare var writedb: Function;
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
declare function addTemplateData(data: HTMLElement, options: object): Function;
declare function extractIntendedUsage(body: string): string;
declare function extractTemplateMime(body: string): number;
declare function extractTemplateCharset(body: string): string;
declare function extractTemplateExtensions(body: string): string;
declare function getTemplateBody(res: string): string;
declare function addSource(data: object, url: string): void;
declare function appendToLine(line: object, str: Function): string;
declare function concat(a: any[], b: any[]): any[];
declare function generateRowMapper(headers: object): Function;
declare function getRfcReferences(reference: string): any[];
declare function getUrlReferences(reference: string): any[];
declare function loadBluebird(): any[];
declare function mimeEql(mime1: string, mime2: string): boolean;
declare function normalizeHeader(val: any[]): string;
declare function parseReferences(reference: string): any[];
