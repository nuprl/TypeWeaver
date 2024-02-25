declare function wrapRange(min: any, max: any, value: any): any;
declare function limitRange(min: any, max: any, value: any): number;
declare function validateRange(min: any, max: any, value: any, minExclusive: any, maxExclusive: any): any;
declare function testRange(min: any, max: any, value: any, minExclusive: any, maxExclusive: any): boolean;
export function curry(min: any, max: any, minExclusive: any, maxExclusive: any): {
    wrap: any;
    limit: any;
    validate: (value: any) => any;
    test: (value: any) => boolean;
    toString: any;
    name: any;
};
export function name(min: any, max: any, minExcl: any, maxExcl: any): string;
export { wrapRange as wrap, limitRange as limit, validateRange as validate, testRange as test };
