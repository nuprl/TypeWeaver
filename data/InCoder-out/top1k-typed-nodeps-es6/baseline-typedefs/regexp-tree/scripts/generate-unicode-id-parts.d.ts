declare function toHex4Digits(i: number): string;
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
declare const MAX_UNICODE_NON_SURROGATE = 65535;
declare const MAX_UNICODE_CODEPOINT = 1114111;
declare const isStart: (c: any) => boolean;
declare const isContinue: (c: any) => boolean;
declare let idStartWriter: Writer;
declare let idContinueWriter: Writer;
