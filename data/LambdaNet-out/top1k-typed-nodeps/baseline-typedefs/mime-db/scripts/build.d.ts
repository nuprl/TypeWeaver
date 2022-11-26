/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var db: object;
declare var mime: object;
declare function addData(db: object, mime: object, source: string): void;
declare function createTypeEntry(source: number): object;
declare function setValue(obj: object, prop: string, value: string): void;
