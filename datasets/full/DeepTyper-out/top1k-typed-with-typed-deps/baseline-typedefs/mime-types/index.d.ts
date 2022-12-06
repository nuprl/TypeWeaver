/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var db: any;
declare var extname: any;
declare var EXTRACT_TYPE_REGEXP: string;
declare var TEXT_TYPE_REGEXP: string;
declare function charset(type: any): string;
declare function contentType(str: string): any;
declare function extension(type: any): string;
declare function lookup(path: string): boolean;
declare function populateMaps(extensions: any, types: any): any;
