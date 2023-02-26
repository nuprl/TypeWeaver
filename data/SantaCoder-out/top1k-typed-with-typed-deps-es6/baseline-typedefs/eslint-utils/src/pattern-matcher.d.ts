export declare class PatternMatcher {
    constructor(pattern: any, { escaped }?: {
        escaped?: boolean;
    });
    execAll(str: any): Generator<any, void, unknown>;
    test(str: any): boolean;
    [Symbol.replace](str: any, replacer: any): string;
}
