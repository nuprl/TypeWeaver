/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var db: object;
declare var extname: Function;
declare var EXTRACT_TYPE_REGEXP: RegExp;
declare var TEXT_TYPE_REGEXP: RegExp;
declare function charset(type: string): boolean;
declare function contentType(str: string): boolean;
declare function extension(type: string): boolean;
declare function lookup(path: string): boolean;
declare function populateMaps(extensions: object, types: object): void;
