export class ParameterError extends Error {
    constructor(...params: any[]);
}
export function isFunction(data: any): boolean;
export function isNonEmptyString(data: any): boolean;
export function isDate(data: any): boolean;
export function isEmptyString(data: any): boolean;
export function isString(data: any): boolean;
export function isObject(data: any): boolean;
export function validate(bool: any, cb: any, options: any): void;
