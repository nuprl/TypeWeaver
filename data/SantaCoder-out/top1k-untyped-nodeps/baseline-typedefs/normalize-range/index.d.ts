declare function wrapRange(min: number, max: number, value: number): number;
declare function limitRange(min: number, max: number, value: number): number;
declare function validateRange(min: number, max: number, value: number, minExclusive: boolean, maxExclusive: boolean): number;
declare function testRange(min: number, max: number, value: number, minExclusive: boolean, maxExclusive: boolean): boolean;
declare function name(min: number, max: number, minExcl: boolean, maxExcl: boolean): string;
declare function curry(min: number, max: number, minExclusive: boolean, maxExclusive: boolean): {
    wrap: any;
    limit: any;
    validate: (value: number) => number;
    test: (value: number) => boolean;
    toString: any;
    name: any;
};
