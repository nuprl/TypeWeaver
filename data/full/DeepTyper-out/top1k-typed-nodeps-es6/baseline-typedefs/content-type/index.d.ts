/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var PARAM_REGEXP: string;
declare var TEXT_REGEXP: string;
declare var TOKEN_REGEXP: string;
declare var QESC_REGEXP: string;
declare var QUOTE_REGEXP: string;
declare var TYPE_REGEXP: string;
declare function format(obj: any): string;
declare function parse(string: any): any;
declare function getcontenttype(obj: any): string;
declare function qstring(val: string): string;
declare function ContentType(type: any): Function;
