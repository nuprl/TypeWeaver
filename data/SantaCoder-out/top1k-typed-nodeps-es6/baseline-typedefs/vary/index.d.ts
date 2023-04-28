/*!
 * vary
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var FIELD_NAME_REGEXP: RegExp;
declare function append(header: string, field: string): string;
declare function parse(header: string): any[];
declare function vary(res: any, field: string): void;
