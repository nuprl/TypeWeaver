declare const _default: {
    wrap: typeof wrapRange;
    limit: typeof limitRange;
    validate: typeof validateRange;
    test: typeof testRange;
    curry: typeof curry;
    name: typeof name;
};
export default _default;
declare function wrapRange(min: number, max: number, value: number): string;
declare function limitRange(min: number, max: number, value: number): number;
declare function validateRange(min: string, max: string, value: string, minExclusive: number, maxExclusive: number): string;
declare function testRange(min: number, max: number, value: number, minExclusive: boolean, maxExclusive: boolean): boolean;
declare function name(min: string, max: number, minExcl: boolean, maxExcl: boolean): string;
declare function curry(min: string, max: string, minExclusive: string, maxExclusive: string): object;
