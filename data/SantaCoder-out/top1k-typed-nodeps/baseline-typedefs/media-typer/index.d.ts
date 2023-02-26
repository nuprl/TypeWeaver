/*!
 * media-typer
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var SUBTYPE_NAME_REGEXP: RegExp;
declare var TYPE_NAME_REGEXP: RegExp;
declare var TYPE_REGEXP: RegExp;
declare function format(obj: any): string;
declare function test(string: string): boolean;
declare function parse(string: string): any;
declare function MediaType(type: string, subtype: string, suffix: string): void;
