declare function toHex4Digits(i: number): string;
declare class NonSurrogateRange {
    constructor(codePoint: number);
    firstCodePoint: number;
    lastCodePoint: number;
    toString(): string;
}
declare class LeadSurrogateRange {
    constructor(leadSurrogate: number);
    leadSurrogate: number;
    ranges: TrailSurrogateRange[];
    toString(): string;
}
declare class TrailSurrogateRange {
    constructor(trailSurrogate: number);
    firstTrailSurrogate: number;
    lastTrailSurrogate: number;
    toString(): string;
}
declare class Writer {
    lastCodePoint: number;
    nonSurrogateRanges: NonSurrogateRange[];
    surrogateRanges: LeadSurrogateRange[];
    nonSurrogateRange: NonSurrogateRange;
    leadSurrogateRange: LeadSurrogateRange;
    trailSurrogateRange: TrailSurrogateRange;
    push(codePoint: number): void;
    toString(): string;
}
declare const MAX_UNICODE_NON_SURROGATE: 65535;
declare const MAX_UNICODE_CODEPOINT: 1114111;
declare function isStart(c: any): boolean;
declare function isContinue(c: any): boolean;
declare let idStartWriter: Writer;
declare let idContinueWriter: Writer;
