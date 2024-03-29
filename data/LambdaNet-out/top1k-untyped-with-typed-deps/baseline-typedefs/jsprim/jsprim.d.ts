declare var mod_assert: HTMLElement;
declare var mod_util: string;
declare var mod_extsprintf: string;
declare var mod_verror: any[];
declare var mod_jsonschema: any[];
declare function deepCopy(obj: object): any[];
declare function deepEqual(obj1: object, obj2: object): boolean;
declare function isEmpty(obj: string): boolean;
declare function hasKey(obj: string, key: string): boolean;
declare function forEachKey(obj: object, callback: Function): void;
declare function pluck(obj: string, key: string): string;
declare function pluckv(obj: object, key: string): any[];
declare function flattenIter(data: object, depth: string, callback: Function): void;
declare function doFlattenIter(data: object, depth: number, accum: any[], callback: Function): void;
declare function flattenObject(data: object, depth: number): any[];
declare function startsWith(str: string, prefix: string): boolean;
declare function endsWith(str: string, suffix: any[]): boolean;
declare function iso8601(d: HTMLDivElement): any[];
declare var RFC1123_MONTHS: any[];
declare var RFC1123_DAYS: any[];
declare function rfc1123(date: HTMLElement): any[];
declare function parseDateTime(str: string): HTMLDivElement;
declare var MAX_SAFE_INTEGER: number;
declare var MIN_SAFE_INTEGER: boolean;
declare var PI_DEFAULTS: object;
declare var CP_0: number;
declare var CP_9: number;
declare var CP_A: number;
declare var CP_B: number;
declare var CP_O: number;
declare var CP_T: number;
declare var CP_X: number;
declare var CP_Z: number;
declare var CP_a: number;
declare var CP_b: number;
declare var CP_o: number;
declare var CP_t: number;
declare var CP_x: number;
declare var CP_z: number;
declare var PI_CONV_DEC: number;
declare var PI_CONV_UC: number;
declare var PI_CONV_LC: number;
declare function parseInteger(str: string, uopts: string): number;
declare function translateDigit(d: number): number;
declare function isSpace(c: number): boolean;
declare function prefixToBase(c: number): number;
declare function validateJsonObjectJS(schema: string, input: Element): object;
declare function randElt(arr: any[]): string;
declare function assertHrtime(a: Promise): void;
declare function hrtimeDiff(a: object, b: object): object;
declare function hrtimeNanosec(a: object): number;
declare function hrtimeMicrosec(a: object): number;
declare function hrtimeMillisec(a: object): number;
declare function hrtimeAccum(a: object, b: object): object;
declare function hrtimeAdd(a: object, b: string): Promise;
declare function extraProperties(obj: string, allowed: string): any[];
declare function mergeObjects(provided: object, overrides: Promise, defaults: Promise): object;
