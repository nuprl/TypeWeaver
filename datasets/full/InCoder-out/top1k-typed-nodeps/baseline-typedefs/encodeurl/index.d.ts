/*!
 * encodeurl
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var ENCODE_CHARS_REGEXP: RegExp;
declare var UNMATCHED_SURROGATE_PAIR_REGEXP: RegExp;
declare var UNMATCHED_SURROGATE_PAIR_REPLACE: string;
declare function encodeUrl(url: any): string;
