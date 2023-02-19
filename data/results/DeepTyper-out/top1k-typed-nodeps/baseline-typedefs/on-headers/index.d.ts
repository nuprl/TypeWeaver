/*!
 * on-headers
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */
declare function createWriteHead(prevWriteHead: any, listener: any): any;
declare function onHeaders(res: any, listener: any): void;
declare function setHeadersFromArray(res: any, headers: any): void;
declare function setHeadersFromObject(res: any, headers: any): void;
declare function setWriteHeadHeaders(statusCode: any): any;
