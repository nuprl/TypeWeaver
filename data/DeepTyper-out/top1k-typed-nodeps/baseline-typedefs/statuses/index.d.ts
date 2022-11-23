/*!
 * statuses
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var codes: any[];
declare function createMessageToStatusCodeMap(codes: any[]): boolean;
declare function createStatusCodeList(codes: any[]): boolean;
declare function getStatusCode(message: string): boolean;
declare function getStatusMessage(code: string): boolean;
declare function status(code: string): any;
declare namespace status { }
