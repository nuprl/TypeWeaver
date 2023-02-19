declare function toHex4Digits(i: NonSurrogateRange): string;
declare class NonSurrogateRange {
    constructor(codePoint: any);
    toString(): string;
}
declare class LeadSurrogateRange {
    constructor(leadSurrogate: any);
    toString(): string;
}
declare class TrailSurrogateRange {
    constructor(trailSurrogate: any);
    toString(): string;
}
declare class Writer {
    constructor();
    push(codePoint: any): void;
    toString(): string;
}
declare const MAX_UNICODE_NON_SURROGATE: number;
declare const MAX_UNICODE_CODEPOINT: number;
declare const isStart: Function;
declare const isContinue: Function;
declare let idStartWriter: any[];
declare let idContinueWriter: any[];
