/*!
 * statuses
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var codes: string;
declare function createMessageToStatusCodeMap(codes: object): object;
declare function createStatusCodeList(codes: string): any[];
declare function getStatusCode(message: string): any[];
declare function getStatusMessage(code: string): any[];
declare function status(code: string): string;
declare namespace status { }
