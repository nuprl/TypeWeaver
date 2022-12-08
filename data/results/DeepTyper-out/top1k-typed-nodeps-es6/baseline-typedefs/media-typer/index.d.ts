/*!
 * media-typer
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var SUBTYPE_NAME_REGEXP: RegExp;
declare var TYPE_NAME_REGEXP: RegExp;
declare var TYPE_REGEXP: string;
declare function format(obj: any): string;
declare function test(string: any): boolean;
declare function parse(string: any): any;
declare function MediaType(type: any, subtype: any, suffix: string): void;
