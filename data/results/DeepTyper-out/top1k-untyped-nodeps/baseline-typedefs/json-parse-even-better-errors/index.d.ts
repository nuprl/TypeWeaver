declare const hexify: string;
declare const parseError: any;
declare class JSONParseError extends SyntaxError {
    constructor(er: any, txt: any, context: any, caller: any);
    get name(): string;
    set name(n: string);
    get [Symbol.toStringTag](): string;
}
declare const kIndent: symbol;
declare const kNewline: unique symbol;
declare const formatRE: RegExp;
declare const emptyRE: string;
declare const parseJson: any;
declare const stripBOM: string;
