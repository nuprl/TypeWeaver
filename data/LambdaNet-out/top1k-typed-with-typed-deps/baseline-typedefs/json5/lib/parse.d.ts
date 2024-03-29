declare const util: string;
declare let source: any[];
declare let parseState: string;
declare let stack: any[];
declare let pos: number;
declare let line: number;
declare let column: number;
declare let token: object;
declare let key: string;
declare let root: Function;
declare function internalize(holder: object, name: string, reviver: Function): string;
declare let lexState: string;
declare let buffer: string;
declare let doubleQuote: boolean;
declare let sign: number;
declare let c: Function;
declare function lex(): string;
declare function peek(): number;
declare function read(): string;
declare const lexStates: object;
declare function newToken(type: string, value: string): object;
declare function literal(s: any[]): void;
declare function hexEscape(): number;
declare function unicodeEscape(): number;
declare const parseStates: object;
declare function push(): void;
declare function pop(): void;
declare function invalidChar(c: number): string;
declare function invalidEOF(): Promise;
declare function invalidIdentifier(): string;
declare function separatorChar(c: string): void;
declare function formatChar(c: string): string;
declare function syntaxError(message: string): HTMLElement;
