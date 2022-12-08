declare function isFunction(data: object): boolean;
declare function isNonEmptyString(data: any[]): boolean;
declare function isDate(data: object): boolean;
declare function isEmptyString(data: string): boolean;
declare function isString(data: object): boolean;
declare function isObject(data: object): boolean;
declare function isInstanceStrict(data: object, prototype: string): boolean;
declare function isInteger(data: number): boolean;
declare function validate(bool: boolean, cb: Function, options: object): void;
declare class ParameterError extends Error {
    constructor(...params: any[]);
}
