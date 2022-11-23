/*!
 * type-is
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var typer: any;
declare var mime: any;
declare function typeis(value: any, types_: any): any;
declare function hasbody(req: any): boolean;
declare function typeofrequest(req: any, types_: any): any;
declare function normalize(type: any): any;
declare function mimeMatch(expected: any, actual: any): boolean;
declare function normalizeType(value: any): any;
declare function tryNormalizeType(value: string): string;
