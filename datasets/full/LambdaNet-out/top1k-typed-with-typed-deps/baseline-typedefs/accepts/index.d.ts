/*!
 * accepts
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var Negotiator: any[];
declare var mime: any[];
declare function Accepts(req: object): string;
declare function extToMime(type: string): any[];
declare function validMime(type: string): boolean;
