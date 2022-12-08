declare function wrapRange(min: number, max: number, value: number): string;
declare function limitRange(min: number, max: number, value: number): number;
declare function validateRange(min: string, max: string, value: string, minExclusive: number, maxExclusive: string): string;
declare function testRange(min: number, max: number, value: number, minExclusive: boolean, maxExclusive: boolean): boolean;
declare function name(min: string, max: number, minExcl: boolean, maxExcl: boolean): string;
declare function curry(min: string, max: string, minExclusive: string, maxExclusive: string): object;
