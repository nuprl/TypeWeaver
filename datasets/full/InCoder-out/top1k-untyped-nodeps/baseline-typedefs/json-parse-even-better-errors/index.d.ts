declare const hexify: (char: any) => string;
declare const parseError: (e: any, txt: any, context: any) => {
    message: string;
    position: number;
};
declare class JSONParseError extends SyntaxError {
    constructor(er: any, txt: any, context: any, caller: any);
    get name(): string;
    set name(n: string);
    get [Symbol.toStringTag](): string;
}
declare const kIndent: unique symbol;
declare const kNewline: unique symbol;
declare const formatRE: RegExp;
declare const emptyRE: RegExp;
declare const parseJson: {
    (txt: any, reviver: any, context: any): any;
    JSONParseError: typeof JSONParseError;
    noExceptions(txt: any, reviver: any): any;
};
declare const stripBOM: (txt: any) => string;
