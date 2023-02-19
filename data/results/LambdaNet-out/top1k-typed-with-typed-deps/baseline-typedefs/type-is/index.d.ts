/*!
 * type-is
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var typer: any[];
declare var mime: any[];
declare function typeis(value: string, types_: any[]): boolean;
declare function hasbody(req: HTMLElement): boolean;
declare function typeofrequest(req: object, types_: any[]): any[];
declare function normalize(type: string): boolean;
declare function mimeMatch(expected: string, actual: string): boolean;
declare function normalizeType(value: string): string;
declare function tryNormalizeType(value: number): Promise;
