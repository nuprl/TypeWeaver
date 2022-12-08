/*!
 * statuses
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var codes: any;
declare function createMessageToStatusCodeMap(codes: Array<number>): {};
declare function createStatusCodeList(codes: number[]): unknown[];
declare function getStatusCode(message: any): any;
declare function getStatusMessage(code: number): any;
declare function status(code: number): any;
declare namespace status { }
