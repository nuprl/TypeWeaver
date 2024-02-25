export default parseJson;
declare function parseJson(txt: any, reviver: any, context: any): any;
declare namespace parseJson {
    export { JSONParseError };
    export function noExceptions(txt: any, reviver: any): any;
}
declare class JSONParseError extends SyntaxError {
    constructor(er: any, txt: any, context: any, caller: any);
    code: string;
    systemError: any;
    get [Symbol.toStringTag](): string;
}
