declare function wrapRange(min: number, max: number, value: number): number;
declare function limitRange(min: number, max: number, value: number): number;
declare function validateRange(min: number, max: number, value: number, minExclusive: number, maxExclusive: number): number;
declare function testRange(min: number, max: number, value: number, minExclusive: number, maxExclusive: number): boolean;
declare function name(min: number, max: number, minExcl: number, maxExcl: number): string;
declare function curry(min: number, max: number, minExclusive: boolean, maxExclusive: number): {
    wrap: any;
    limit: any;
    validate: (value: any) => number;
    test: (value: any) => boolean;
    toString: any;
    name: any;
};
