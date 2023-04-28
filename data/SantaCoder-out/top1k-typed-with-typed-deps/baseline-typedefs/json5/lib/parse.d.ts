declare const util: any;
declare let source: any;
declare let parseState: any;
declare let stack: any;
declare let pos: any;
declare let line: any;
declare let column: any;
declare let token: any;
declare let key: any;
declare let root: any;
declare function internalize(holder: any, name: string, reviver: any): any;
declare let lexState: any;
declare let buffer: any;
declare let doubleQuote: any;
declare let sign: any;
declare let c: any;
declare function lex(): any;
declare function peek(): string;
declare function read(): string;
declare const lexStates: {
    default(): any;
    comment(): void;
    multiLineComment(): void;
    multiLineCommentAsterisk(): void;
    singleLineComment(): {
        type: string;
        value: any;
        line: any;
        column: any;
    };
    value(): {
        type: string;
        value: any;
        line: any;
        column: any;
    };
    identifierNameStartEscape(): void;
    identifierName(): {
        type: string;
        value: any;
        line: any;
        column: any;
    };
    identifierNameEscape(): void;
    sign(): {
        type: string;
        value: any;
        line: any;
        column: any;
    };
    zero(): {
        type: string;
        value: any;
        line: any;
        column: any;
    };
    decimalInteger(): {
        type: string;
        value: any;
        line: any;
        column: any;
    };
    decimalPointLeading(): void;
    decimalPoint(): {
        type: string;
        value: any;
        line: any;
        column: any;
    };
    decimalFraction(): {
        type: string;
        value: any;
        line: any;
        column: any;
    };
    decimalExponent(): void;
    decimalExponentSign(): void;
    decimalExponentInteger(): {
        type: string;
        value: any;
        line: any;
        column: any;
    };
    hexadecimal(): void;
    hexadecimalInteger(): {
        type: string;
        value: any;
        line: any;
        column: any;
    };
    string(): {
        type: string;
        value: any;
        line: any;
        column: any;
    };
    start(): {
        type: string;
        value: any;
        line: any;
        column: any;
    };
    beforePropertyName(): {
        type: string;
        value: any;
        line: any;
        column: any;
    };
    afterPropertyName(): {
        type: string;
        value: any;
        line: any;
        column: any;
    };
    beforePropertyValue(): void;
    afterPropertyValue(): {
        type: string;
        value: any;
        line: any;
        column: any;
    };
    beforeArrayValue(): {
        type: string;
        value: any;
        line: any;
        column: any;
    };
    afterArrayValue(): {
        type: string;
        value: any;
        line: any;
        column: any;
    };
    end(): never;
};
declare function newToken(type: string, value: any): {
    type: string;
    value: any;
    line: any;
    column: any;
};
declare function literal(s: string): void;
declare function hexEscape(): string;
declare function unicodeEscape(): string;
declare const parseStates: {
    start(): void;
    beforePropertyName(): void;
    afterPropertyName(): void;
    beforePropertyValue(): void;
    beforeArrayValue(): void;
    afterPropertyValue(): void;
    afterArrayValue(): void;
    end(): void;
};
declare function push(): void;
declare function pop(): void;
declare function invalidChar(c: string): SyntaxError;
declare function invalidEOF(): SyntaxError;
declare function invalidIdentifier(): SyntaxError;
declare function separatorChar(c: string): void;
declare function formatChar(c: string): any;
declare function syntaxError(message: string): SyntaxError;
