/** @param {number} i */
declare function toHex4Digits(i: number): string;
declare class NonSurrogateRange {
    /** @param {number} codePoint */
    constructor(codePoint: number);
    firstCodePoint: number;
    lastCodePoint: number;
    toString(): string;
}
declare class LeadSurrogateRange {
    /** @param {number} leadSurrogate */
    constructor(leadSurrogate: number);
    leadSurrogate: number;
    /** @type {TrailSurrogateRange[]} */
    ranges: TrailSurrogateRange[];
    toString(): string;
}
declare class TrailSurrogateRange {
    /** @param {number} trailSurrogate */
    constructor(trailSurrogate: number);
    firstTrailSurrogate: number;
    lastTrailSurrogate: number;
    toString(): string;
}
declare class Writer {
    /** @type {number} */
    lastCodePoint: number;
    /** @type {NonSurrogateRange[]} */
    nonSurrogateRanges: NonSurrogateRange[];
    /** @type {LeadSurrogateRange[]} */
    surrogateRanges: LeadSurrogateRange[];
    /** @type {NonSurrogateRange} */
    nonSurrogateRange: NonSurrogateRange;
    /** @type {LeadSurrogateRange} */
    leadSurrogateRange: LeadSurrogateRange;
    /** @type {TrailSurrogateRange} */
    trailSurrogateRange: TrailSurrogateRange;
    /** @param {number} codePoint */
    push(codePoint: number): void;
    toString(): string;
}
declare const MAX_UNICODE_NON_SURROGATE: 65535;
declare const MAX_UNICODE_CODEPOINT: 1114111;
declare function isStart(c: any): boolean;
declare function isContinue(c: any): boolean;
declare let idStartWriter: Writer;
declare let idContinueWriter: Writer;
