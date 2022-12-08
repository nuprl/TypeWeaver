/*!
 * etag
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var crypto: string;
declare var Stats: Function;
declare var toString: Function;
declare function entitytag(entity: string): string;
declare function etag(entity: string, options: object): number;
declare function isstats(obj: object): boolean;
declare function stattag(stat: object): string;
