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
declare function format(obj: Object): any;
declare function parse(string: string): any;
declare function getcontenttype(obj: any): string;
declare function qstring(val: any): string;
declare function ContentType(type: string): void;
