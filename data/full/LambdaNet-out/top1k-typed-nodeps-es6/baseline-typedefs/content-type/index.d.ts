/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var PARAM_REGEXP: RegExp;
declare var TEXT_REGEXP: RegExp;
declare var TOKEN_REGEXP: RegExp;
declare var QESC_REGEXP: RegExp;
declare var QUOTE_REGEXP: RegExp;
declare var TYPE_REGEXP: RegExp;
declare function format(obj: object): string;
declare function parse(string: string): object;
declare function getcontenttype(obj: HTMLElement): string;
declare function qstring(val: string): string;
declare function ContentType(type: string): void;
