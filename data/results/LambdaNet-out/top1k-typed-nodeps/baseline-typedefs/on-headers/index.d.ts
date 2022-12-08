/*!
 * on-headers
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */
declare function createWriteHead(prevWriteHead: Function, listener: Function): Function;
declare function onHeaders(res: Map, listener: string): void;
declare function setHeadersFromArray(res: object, headers: any[]): void;
declare function setHeadersFromObject(res: object, headers: object): void;
declare function setWriteHeadHeaders(statusCode: number): any[];
