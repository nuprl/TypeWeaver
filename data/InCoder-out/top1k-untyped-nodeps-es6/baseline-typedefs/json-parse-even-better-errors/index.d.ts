declare class JSONParseError extends SyntaxError {
    constructor(er: any, txt: any, context: any, caller: any);
    get name(): string;
    set name(n: string);
    get [Symbol.toStringTag](): string;
}
declare const parseJson: {
    (txt: any, reviver: any, context: any): any;
    JSONParseError: typeof JSONParseError;
    noExceptions(txt: any, reviver: any): any;
};
export default parseJson;
