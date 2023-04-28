declare function isFunction(data: any): boolean;
declare function isNonEmptyString(data: any): boolean;
declare function isDate(data: any): boolean;
declare function isEmptyString(data: any): boolean;
declare function isString(data: any): boolean;
declare function isObject(data: any): boolean;
declare function isInstanceStrict(data: any, prototype: any): boolean;
declare function isInteger(data: any): boolean;
declare function validate(bool: boolean, cb: Function, options: Object): void;
declare class ParameterError extends Error {
    constructor(...params: any[]);
}
