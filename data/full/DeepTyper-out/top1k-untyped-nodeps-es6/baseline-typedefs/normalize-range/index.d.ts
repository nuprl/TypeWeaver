declare const _default: {
    wrap: typeof wrapRange;
    limit: typeof limitRange;
    validate: typeof validateRange;
    test: typeof testRange;
    curry: typeof curry;
    name: typeof name;
};
export default _default;
declare function wrapRange(min: number, max: number, value: number): number;
declare function limitRange(min: number, max: number, value: number): number;
declare function validateRange(min: number, max: number, value: number, minExclusive: number, maxExclusive: number): any;
declare function testRange(min: number, max: number, value: number, minExclusive: number, maxExclusive: number): boolean;
declare function name(min: number, max: number, minExcl: number, maxExcl: number): string;
declare function curry(min: number, max: number, minExclusive: number, maxExclusive: number): Function;
