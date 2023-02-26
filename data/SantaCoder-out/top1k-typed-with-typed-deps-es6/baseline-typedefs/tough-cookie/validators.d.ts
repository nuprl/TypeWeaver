declare function isFunction(data: any): boolean;
declare function isNonEmptyString(data: string): boolean;
declare function isDate(data: any): boolean;
declare function isEmptyString(data: string): boolean;
declare function isString(data: any): boolean;
declare function isObject(data: any): boolean;
declare function isInstanceStrict(data: any, prototype: any): boolean;
declare function isInteger(data: number): boolean;
declare function validate(bool: boolean, cb: any, options: any): void;
declare class ParameterError extends Error {
    constructor(...params: any[]);
}
