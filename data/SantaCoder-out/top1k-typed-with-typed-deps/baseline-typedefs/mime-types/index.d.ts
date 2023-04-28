/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var db: any;
declare var extname: any;
declare var EXTRACT_TYPE_REGEXP: RegExp;
declare var TEXT_TYPE_REGEXP: RegExp;
declare function charset(type: string): any;
declare function contentType(str: string): any;
declare function extension(type: string): any;
declare function lookup(path: string): any;
declare function populateMaps(extensions: Object, types: Object): void;
