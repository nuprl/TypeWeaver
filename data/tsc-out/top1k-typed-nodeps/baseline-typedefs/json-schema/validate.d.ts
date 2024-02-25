export namespace Integer {
    const type: string;
}
export function checkPropertyChange(value: any, schema: any, property: any): any;
export function _validate(instance: any, schema: any, options: any): {
    valid: boolean;
    errors: any[];
};
export function mustBeValid(result: any): void;
declare function _exports(instance: any, schema: any): any;
declare namespace _exports { }
export = _exports;
export function validate(instance: any, schema: any): any;
