declare const hexify: Function;
declare const parseError: Function;
declare class JSONParseError extends SyntaxError {
    constructor(er: any, txt: any, context: any, caller: any);
    get name(): string;
    set name(n: string);
    get [Symbol.toStringTag](): string;
}
declare const kIndent: string;
declare const kNewline: string;
declare const formatRE: RegExp;
declare const emptyRE: RegExp;
declare const parseJson: Function;
declare const stripBOM: Function;
